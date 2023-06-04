import React, { useState } from 'react';
import { ReactMic } from 'react-mic';

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const onData = (recordedBlob) => {
    console.log('chunk of real-time data is: ', recordedBlob);
  };

  const onStop = (recordedBlob) => {
    console.log('recordedBlob is: ', recordedBlob);
    setRecordedBlob(recordedBlob.blob);

    const file = new File([recordedBlob.blob], 'recorded_audio.wav', {
      type: recordedBlob.blob.type,
      lastModified: Date.now(),
    });

    saveFile(file);
  };

  const saveFile = (file) => {
    const anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(file);
    anchor.download = file.name;
    anchor.click();
    URL.revokeObjectURL(anchor.href);
  };

  return (
    <div>
      <h1>Audio Recorder</h1>
      <ReactMic
        record={isRecording}
        className="sound-wave"
        onStop={onStop}
        onData={onData}
        strokeColor="#000000"
        backgroundColor="#FF4081"
      />
      <button onClick={startRecording} disabled={isRecording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        Stop Recording
      </button>
      {recordedBlob && (
        <div>
          <audio src={URL.createObjectURL(recordedBlob)} controls />
          <a href={URL.createObjectURL(recordedBlob)} download="recorded_audio.wav">
            Download
          </a>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
