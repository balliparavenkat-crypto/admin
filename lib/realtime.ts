import api from "./api";

export type EventType = 
  | "NEW_REGISTRATION"
  | "PAYMENT_SUCCESS"
  | "NEW_PAPER"
  | "REVIEW_SUBMITTED"
  | "NEW_USER"
  | "SUMMIT_UPDATED"
  | "SESSION_UPDATED"
  | "ANNOUNCEMENT_PUBLISHED"
  | "ATTENDANCE_CHECKED_IN"
  | "CERTIFICATE_GENERATED";

export interface RealtimeEventPayload {
  eventId: string;
  eventType: EventType;
  title: string;
  description: string;
  details?: any;
  timestamp: string;
}

export type EventCallback = (event: RealtimeEventPayload) => void;

class RealtimeManager {
  private listeners: Set<EventCallback> = new Set();
  private eventSource: EventSource | null = null;
  private pollInterval: any = null;

  public subscribe(callback: EventCallback): () => void {
    this.listeners.add(callback);

    if (this.listeners.size === 1) {
      this.connect();
    }

    return () => {
      this.listeners.delete(callback);
      if (this.listeners.size === 0) {
        this.disconnect();
      }
    };
  }

  private connect() {
    if (typeof window === "undefined") return;

    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
      this.eventSource = new EventSource(`${backendUrl}/api/events/sse`);

      this.eventSource.addEventListener("dashboard-event", (e: MessageEvent) => {
        try {
          const data: RealtimeEventPayload = JSON.parse(e.data);
          this.notifyListeners(data);
        } catch (err) {
          console.error("Failed to parse SSE event data", err);
        }
      });

      this.eventSource.onerror = () => {
        if (this.eventSource) {
          this.eventSource.close();
          this.eventSource = null;
        }
        this.startFallbackPolling();
      };
    } catch {
      this.startFallbackPolling();
    }
  }

  private startFallbackPolling() {
    if (this.pollInterval) return;

    let lastKnownEventId = "";
    this.pollInterval = setInterval(async () => {
      try {
        const res = await api.get("/events/recent");
        const events: RealtimeEventPayload[] = res.data;
        if (events && events.length > 0) {
          const latest = events[0];
          if (latest.eventId !== lastKnownEventId) {
            lastKnownEventId = latest.eventId;
            this.notifyListeners(latest);
          }
        }
      } catch {
        // Silently ignore polling errors in local fallback mode
      }
    }, 5000);
  }

  private disconnect() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = null;
    }
  }

  private notifyListeners(event: RealtimeEventPayload) {
    this.listeners.forEach((callback) => {
      try {
        callback(event);
      } catch (err) {
        console.error("Error in realtime listener callback", err);
      }
    });
  }

  public async triggerEvent(eventType: EventType, title: string, description: string, details?: any): Promise<RealtimeEventPayload | null> {
    try {
      const res = await api.post("/events/trigger", {
        eventType,
        title,
        description,
        details,
      });
      const payload: RealtimeEventPayload = res.data;
      this.notifyListeners(payload);
      return payload;
    } catch {
      // Direct local notification fallback if backend trigger endpoint is unreachable
      const fallbackPayload: RealtimeEventPayload = {
        eventId: "LOCAL-" + Date.now(),
        eventType,
        title,
        description,
        details,
        timestamp: new Date().toISOString(),
      };
      this.notifyListeners(fallbackPayload);
      return fallbackPayload;
    }
  }
}

export const realtimeManager = new RealtimeManager();
