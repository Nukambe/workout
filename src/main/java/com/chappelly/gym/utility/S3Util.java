package com.chappelly.gym.utility;

import org.springframework.stereotype.Service;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.nio.file.Paths;

@Service
public class S3Util {

    private static final String BUCKET = "gymnav";
    private static final Region REGION = Region.US_EAST_1;
    private static final S3Client S3 = S3Client.builder()
            .region(REGION)
            .credentialsProvider(DefaultCredentialsProvider.create())
            .build();

    public S3Util() {}

    public void uploadAvatar(String filePath, String keyName) {
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(BUCKET)
                .key(keyName)
                .build();

        S3.putObject(putObjectRequest, RequestBody.fromFile(Paths.get(filePath)));
    }
}
