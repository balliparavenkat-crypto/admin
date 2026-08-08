package com.dvglobal.service;

import com.dvglobal.entity.Conference;
import com.dvglobal.entity.Session;
import com.dvglobal.entity.Speaker;
import com.dvglobal.entity.Track;
import com.dvglobal.repository.ConferenceRepository;
import com.dvglobal.repository.SessionRepository;
import com.dvglobal.repository.SpeakerRepository;
import com.dvglobal.repository.TrackRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ConferenceService {

    private final ConferenceRepository conferenceRepository;
    private final TrackRepository trackRepository;
    private final SpeakerRepository speakerRepository;
    private final SessionRepository sessionRepository;

    public ConferenceService(ConferenceRepository conferenceRepository, TrackRepository trackRepository,
                             SpeakerRepository speakerRepository, SessionRepository sessionRepository) {
        this.conferenceRepository = conferenceRepository;
        this.trackRepository = trackRepository;
        this.speakerRepository = speakerRepository;
        this.sessionRepository = sessionRepository;
    }

    public List<Conference> getAllConferences() {
        return conferenceRepository.findAll();
    }

    public Conference getConferenceById(Long id) {
        return conferenceRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Conference not found with ID: " + id));
    }

    public Conference getConferenceByAcronym(String acronym) {
        return conferenceRepository.findByAcronym(acronym)
                .orElseThrow(() -> new IllegalArgumentException("Conference not found with acronym: " + acronym));
    }

    public Conference createConference(Conference conference) {
        if (conferenceRepository.existsByAcronym(conference.getAcronym())) {
            throw new IllegalArgumentException("Conference acronym already exists: " + conference.getAcronym());
        }
        return conferenceRepository.save(conference);
    }

    public Conference updateConference(Long id, Conference details) {
        Conference conf = getConferenceById(id);
        conf.setTitle(details.getTitle());
        conf.setDescription(details.getDescription());
        conf.setStartDate(details.getStartDate());
        conf.setEndDate(details.getEndDate());
        conf.setVenueName(details.getVenueName());
        conf.setVenueAddress(details.getVenueAddress());
        conf.setCity(details.getCity());
        conf.setCountry(details.getCountry());
        conf.setStatus(details.getStatus());
        conf.setRegistrationFeeAuthor(details.getRegistrationFeeAuthor());
        conf.setRegistrationFeeListener(details.getRegistrationFeeListener());
        conf.setCurrency(details.getCurrency());
        return conferenceRepository.save(conf);
    }

    public void deleteConference(Long id) {
        conferenceRepository.deleteById(id);
    }

    // Tracks
    public Track addTrack(Long conferenceId, Track track) {
        Conference conf = getConferenceById(conferenceId);
        track.setConference(conf);
        return trackRepository.save(track);
    }

    public List<Track> getTracksByConference(Long conferenceId) {
        return trackRepository.findByConferenceId(conferenceId);
    }

    // Speakers
    public Speaker addSpeaker(Long conferenceId, Speaker speaker) {
        Conference conf = getConferenceById(conferenceId);
        speaker.setConference(conf);
        return speakerRepository.save(speaker);
    }

    public List<Speaker> getSpeakersByConference(Long conferenceId) {
        return speakerRepository.findByConferenceId(conferenceId);
    }

    // Sessions
    public Session addSession(Long conferenceId, Session session) {
        Conference conf = getConferenceById(conferenceId);
        session.setConference(conf);
        return sessionRepository.save(session);
    }

    public List<Session> getSessionsByConference(Long conferenceId) {
        return sessionRepository.findByConferenceIdOrderByStartTimeAsc(conferenceId);
    }
}
