import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";

function useSpotify() {
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
  });
  const { data: session, status } = useSession();
  useEffect(() => {
    if (session) {
      // if refresh access token attempt fails, direct user to login...
      if (session.error === "RefreshAccessTokenError") {
        console.log("error occured in spotify hook", session.error);
        signIn();
      }
      console.log(session.user.accessToken, "<<<<<<<<<<<Access token>>>>>>");
      spotifyApi.setAccessToken(session.user.accessToken);
    }
  }, [session]);
  return spotifyApi;
}

export default useSpotify;
