package httpserver;
import java.io.*;
import java.net.*;

public class HttpServer {
    private ServerSocket serverSocket;
    private Socket clientSocket;

    public void start(){
        int port = 8000;
        try{
            this.serverSocket = new ServerSocket(port); //porta del browser
            System.out.println("Server in ascolto sulla porta " + port);

            while (true) {
                this.clientSocket = serverSocket.accept();
        
                InnerHttpServer handler = new InnerHttpServer();
                handler.handleRequest(clientSocket);
            }
        }catch(Exception e){}
    }

    private class InnerHttpServer extends Thread{
    
    
     private void handleRequest(Socket clientSocket){
        try{
            BufferedReader inputstream = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
            DataOutputStream outputStream = new DataOutputStream(clientSocket.getOutputStream());
            
            String requestString = inputstream.readLine();
            System.out.println(requestString);

            //controllo della request
            if(requestString != null && requestString.startsWith("GET")){
                sendResponse(outputStream, "HTTP/1.1 200 OK", "text/html", readHtml("text.html"));
                System.out.println("Ho finito di inviare");
            }else{
                sendResponse(outputStream, "HTTP/1.1 400 Bad Request", "", "Bad request");
            }

        }catch(Exception e){}
    }

    private  String readHtml(String filename){
        StringBuilder content = new StringBuilder(); /*StringBuilder  è un oggetto dinamico che 
                                                      consente di espandere il numero di caratteri nella stringa incapsulata*/
        try{
            System.out.println("INVIO PAGINA HTML AL BROWSER");
            BufferedReader reader = new BufferedReader(new FileReader(new File(filename)));
            String line;

            while ((line = reader.readLine()) != null) {
                    content.append(line).append("\n"); //ogni volta che viene letta una riga la concatena e va a capo
            }
            
        }catch(Exception e){
            System.out.println("Non fa");
        }

        return content.toString();
    }

    private  void sendResponse(DataOutputStream outputStream , String status , String contentType , String content){
        try{
            String response = status + "\r\n"+
                              "Content-type: " + contentType + "\r\n"+
                               "\r\n"+ //riga vuota che separa gli headers dal body
                               content;
            outputStream.writeBytes(response);
            outputStream.flush();
        }catch(Exception e){}
    }
    }
}
