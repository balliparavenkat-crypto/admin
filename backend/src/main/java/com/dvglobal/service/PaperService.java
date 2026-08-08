package com.dvglobal.service;

import com.dvglobal.entity.Paper;
import com.dvglobal.entity.PaperAuthor;
import com.dvglobal.entity.Track;
import com.dvglobal.entity.User;
import com.dvglobal.repository.PaperAuthorRepository;
import com.dvglobal.repository.PaperRepository;
import com.dvglobal.repository.TrackRepository;
import com.dvglobal.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class PaperService {

    private final PaperRepository paperRepository;
    private final TrackRepository trackRepository;
    private final UserRepository userRepository;

    public PaperService(PaperRepository paperRepository, TrackRepository trackRepository,
                        UserRepository userRepository) {
        this.paperRepository = paperRepository;
        this.trackRepository = trackRepository;
        this.userRepository = userRepository;
    }

    public List<Paper> getAllPapers() {
        return paperRepository.findAll();
    }

    public List<Paper> getPapersBySubmitter(Long userId) {
        return paperRepository.findBySubmitterId(userId);
    }

    public List<Paper> getPapersBySubmitterEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + email));
        return paperRepository.findBySubmitterId(user.getId());
    }


    public List<Paper> getPapersByConference(Long conferenceId) {
        return paperRepository.findByTrackConferenceId(conferenceId);
    }

    public Paper getPaperById(Long id) {
        return paperRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Paper not found with ID: " + id));
    }

    public Paper submitPaper(Paper paper, Long trackId, String submitterEmail) {
        User submitter = userRepository.findByEmail(submitterEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + submitterEmail));
        Track track = trackRepository.findById(trackId)
                .orElseThrow(() -> new IllegalArgumentException("Track not found with ID: " + trackId));

        paper.setSubmitter(submitter);
        paper.setTrack(track);
        paper.setStatus("SUBMITTED");

        if (paper.getCoAuthors() != null) {
            for (PaperAuthor author : paper.getCoAuthors()) {
                author.setPaper(paper);
            }
        }

        return paperRepository.save(paper);
    }

    public Paper updatePaperStatus(Long paperId, String status) {
        Paper paper = getPaperById(paperId);
        paper.setStatus(status.toUpperCase());
        return paperRepository.save(paper);
    }

    public Paper assignDoi(Long paperId, String doi) {
        Paper paper = getPaperById(paperId);
        paper.setDoi(doi);
        return paperRepository.save(paper);
    }
}
