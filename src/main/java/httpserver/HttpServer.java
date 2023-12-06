package httpserver;
import java.io.*;
import java.net.*;

public class HttpServer {
    private ServerSocket serverSocket;
    private Socket clienSocket;
    private BufferedReader inputstream;
    private DataOutputStream outputStream;

    public void start(){
        try{
            this.serverSocket = new ServerSocket(8000); //porta del browser
            System.out.println("Server in ascolto sulla porta 8000");

            while (true) {
                this.clienSocket = serverSocket.accept();
                this.inputstream = new BufferedReader(new InputStreamReader(clienSocket.getInputStream()));
                this.outputStream = new DataOutputStream(clienSocket.getOutputStream());
                
                String requestString = inputstream.readLine();
                //String uri = requestString.split("")[1];
                System.out.println(requestString);
                /* 
                String contenuto = "";

                if(uri.equals("/")){
                    
                }*/
            }
        }catch(Exception e){}
    }

    public void leggiFile(){

    }
}
