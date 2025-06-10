import { useRef } from "react";
import styles from "./App.module.less";
import IndexDBService from "./service/IndexDBService";
function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onSave = (videoUrl?: string) => {
    if (!videoUrl) return;
    const attachment = {
      url: videoUrl,
    };
    IndexDBService.loadAndStoreFile(attachment, (file) => {
      const blobUrl = file.blob ? URL.createObjectURL(file.blob) : undefined;
      if (videoRef.current && blobUrl) {
        videoRef.current.src = blobUrl;
      }
    });
  };

  return (
    <>
      <div className={styles.formBox}>
        <input
          type="text"
          ref={inputRef}
          placeholder="输入视频URL"
          defaultValue="https://23051f50-4866-41ae-a192-33b39f28adef.mdnplay.dev/shared-assets/videos/flower.webm"
          onChange={(e) => {
            inputRef.current!.value = e.target.value;
          }}
        />
        <button onClick={() => onSave(inputRef.current!.value)}>
          存入IndexDB
        </button>
      </div>
      <div>
        注意视频需要允许跨域访问，或者同源。
        如果已经存入（这里以url为唯一校验），点击“存入IndexDB”按钮则不在重复存入，而是取出对应的缓存视频。
        对于已经存入的视频，可以离线读取。
      </div>
      <div className={styles.videoBox}>
        <video controls ref={videoRef}></video>
      </div>
    </>
  );
}

export default App;
