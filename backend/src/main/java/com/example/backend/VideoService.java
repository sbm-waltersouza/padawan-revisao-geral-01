package com.example.backend;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VideoService {
    @Autowired
    private VideoRepository videoRepository;

    public List<Video> getAllVideos() {
        return videoRepository.findAll();
    }

    public Video updateVideo(Long id, Video videoDetails) {
    	Video video = videoRepository.findById(id).orElseThrow(() -> new RuntimeException("Video not found"));
    	
    	video.setNome(videoDetails.getNome());
    	video.setLink(videoDetails.getLink());
    	
    	return videoRepository.save(video);
    }
    
    public Video createVideo(Video video) {
        return videoRepository.save(video);
    }

    public void deleteVideo(Long id) {
        videoRepository.deleteById(id);
    }
    
    public List<Video> searchVideos(String query) {
        return videoRepository.findByNomeContainingIgnoreCase(query);
    }


    
}
