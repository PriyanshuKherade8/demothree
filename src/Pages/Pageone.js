import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import httpClient, { backendClient } from "../httpClient";
import Box from "@mui/material/Box";
import IframeResizer from "@iframe-resizer/react";
import { Button } from "@mui/material";

const fetchExperience = async () => {
  const response = await httpClient.get("/get_experience", {
    params: { experience: "EXP1000000025" },
  });
  return response.data;
};

const rotateCall = async (payload) => {
  const response = await backendClient.post(
    "/player/send_socket_message",
    payload
  );
  return response.data;
};

const Pageone = () => {
  const [rotate, setRotate] = useState(false);
  console.log("rotate", rotate);

  const { data, error, isLoading } = useQuery({
    queryKey: ["experience"],
    queryFn: fetchExperience,
  });

  const {
    mutate: sendRotateCall,
    isLoading: isMutating,
    error: mutationError,
  } = useMutation({
    mutationFn: (payload) => rotateCall(payload),
  });

  if (isLoading) return <>Loading...</>;
  if (error) return <>Error: {error.message}</>;

  const getData = data;
  console.log("getata", getData?.sessionID);
  const experienceId = getData?.experience?.experience_id;
  const productKey = getData?.experience?.products[0]?.product_key;
  const sessionId = getData?.sessionID;
  const canvasUrl = "http://64.227.170.212";
  const url = `${canvasUrl}?experience=${experienceId}+&product=${productKey}+&session=${sessionId}`;
  console.log("url", url);

  const handleRotate = () => {
    const payload = { type: "xyz", defaultState: rotate };
    sendRotateCall(payload);
    setRotate(!rotate);
  };
  return (
    <>
      <Box
        style={{
          border: "1px solid green",
          display: "flex",
          width: "100%",
          gap: "26px",
          // justifyContent: "space-between",
        }}
      >
        <Box style={{ border: "1px solid red", width: "90%" }}>
          <IframeResizer
            id="one"
            src={url}
            scrolling="no"
            height="100%"
            width="100%"
          />
        </Box>
        <Box>
          <Button variant="contained" size="small" onClick={handleRotate}>
            Rotate
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Pageone;
