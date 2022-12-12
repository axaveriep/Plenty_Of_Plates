package com.techelevator.business;

import com.techelevator.exceptions.SearchFailedException;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Scanner;

@Service
public class YelpAPIService {
    /** this service class connects to Yelp's external API, allowing us to use our own controller as a proxy
     * because YELP does not allow calls to their API from javascript/front end applications */

    private final String yelpBaseUrl = "https://api.yelp.com/v3/businesses/";
    String bearerToken = "Bearer 7w0VfA6HD2GXdQe2o4LNVcW5Iq1KuAJn6_gLLIzBunEceC7_4aqXaCmk-kJqbKBfRCyENM1PMQBj2HIfX38CjudMNT1mJrYE5NAb6ck7m-L_x2H0Mu4srV7LkWYSY3Yx";

//    public void getbearerToken() throws FileNotFoundException {
//        try {
//            Scanner txtIn = new Scanner(new File(System.getProperty("user.dir")+"\\YELP_API_TOKEN.txt"));
//            while (txtIn.hasNext()) {
//                this.bearerToken += txtIn.next();
//            }
//            txtIn.close();
//        }
//        catch (FileNotFoundException e) {
//            System.out.println(e.getMessage());
//            throw new FileNotFoundException();
//        }
//    }

    public String searchRestaurantsByLocation(String location, String term) throws SearchFailedException{

        try {
            // getbearerToken();
            HttpClient httpClient = HttpClient.newHttpClient();

            HttpRequest searchRequest = HttpRequest.newBuilder()
                    .uri(new URI(yelpBaseUrl + "search?location=" + location + "&term=" + term))
                    .header("Authorization", bearerToken)
                    .build();

            HttpResponse<String> searchResponse = httpClient.send(searchRequest, HttpResponse.BodyHandlers.ofString());

            return searchResponse.body();
        } catch (URISyntaxException | InterruptedException | IOException e) {
            System.out.println(e.getMessage());
            throw new SearchFailedException();
        }
    }

    public String getRestaurantById(String restaurantId) throws SearchFailedException {
        try {
            // getbearerToken();

            HttpClient httpClient = HttpClient.newHttpClient();

            HttpRequest getRequest = HttpRequest.newBuilder()
                    .uri(new URI(yelpBaseUrl + restaurantId))
                    .header("Authorization", bearerToken)
                    .build();

            HttpResponse<String> getResponse = httpClient.send(getRequest, HttpResponse.BodyHandlers.ofString());

            return getResponse.body();
        } catch (URISyntaxException | IOException | InterruptedException e) {
            throw new SearchFailedException();
        }
    }
}
