import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import { useProgress, Html } from '@react-three/drei';
import Model from './Model';
import { Camera } from './Camera';
import './App.css';

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <h3 style={{ fontSize: '1.5rem', color: '#444' }}>
        Loading... {progress.toFixed(0)}%
      </h3>
    </Html>
  );
}

function App() {
  const d = new Date();
  let year = d.getFullYear();

  const body = [
    { title: "Hello World!", content: "Are you ready? Turn on the light!" },
    { title: "Hi There!", content: "How are you?" },
    { title: "I'm Satya Adil Faishal", content: "I was born " + (year - 2003).toString() + " years ago." },
    { title: "Breaking News!!!", content: "This newspaper describes me." },
    { title: "Start Now", content: "If you want to be successful, do something!" },
    { title: "My Projects", content: "These are all projects created by me. Click there!" },
    { title: "Windows XP", content: "This is my first windows." },
    { title: "Follow Me", content: "Click there if you are interested." }
  ];

  const [pos, setPos] = useState(0);
  const [isTurnOn, setIsTurnOn] = useState(false);
  const [poinIntensity, setPoinIntensity] = useState(5);
  const [directionalIntensity, setDirectionalIntensity] = useState(0);

  const turnOn = () => {
    if (!isTurnOn) {
      setPoinIntensity(0);
      setDirectionalIntensity(2);
      setIsTurnOn(true);
    } else {
      setPoinIntensity(5);
      setDirectionalIntensity(0);
      setIsTurnOn(false);
    }
  };

  return (
    <div id="App">
      {/* Canvas Area */}
      <div id="canvas">
        <Canvas shadows>
          <Suspense fallback={<Loader />}>
            <Camera pos={pos} setPos={setPos} />
            <Model />
            <pointLight
              color="white"
              position={[0.442, 2.531, -2.971]}
              intensity={poinIntensity}
              decay={2}
            />
            <directionalLight
              color="white"
              position={[5, 11, 9]}
              intensity={directionalIntensity}
              castShadow
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Content Area */}
      <div id="content">
        <h1>{body[pos].title}</h1>
        <p style={{ fontSize: "20px" }}>{body[pos].content}</p>
        <div id="buttons">
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              disabled={pos <= 0}
              onClick={() => setPos(pos - 1)}
            >
              <span className="material-symbols-outlined">arrow_left_alt</span>
              Back
            </button>
            <button
              disabled={pos >= body.length - 1}
              onClick={() => setPos(pos + 1)}
            >
              Next
              <span className="material-symbols-outlined">arrow_right_alt</span>
            </button>
          </div>
          <button onClick={turnOn} id="light">
            Turn {isTurnOn ? "Off" : "On"} Light
            <span className="material-symbols-outlined">emoji_objects</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
