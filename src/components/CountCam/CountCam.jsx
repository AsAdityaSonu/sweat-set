import React from 'react';
import Sketch from 'react-p5';

const CountCam = () => {
  //Variables
  let cnv;
  let capture;
  let cameraStarted = false;
  let startstopBtn;
  let bg_img;

  // Setup Functions
  const setup = (p5) => {
    cnv = p5.createCanvas(p5.windowWidth * 0.8, p5.windowHeight * 0.8);
    styleCanvas();
    buttonFn(p5);
  };

  // Preload Function
  const preload = (p5) => {
    bg_img = p5.loadImage('./camera.png');
  };

  // ----- center canvas -----
  function centerCanvas(p5) {
    let x = (p5.windowWidth - p5.width) / 2;
    let y = (p5.windowHeight - p5.height) / 2;
    cnv.position(x, y);
  }

  // ----- start camera btn -----
  function buttonFn(p5) {
    startstopBtn = p5.createButton('Start Camera');

    // CSS styles for button
    startstopBtn.style('all', 'unset');
    startstopBtn.style('background', '#FF4655');
    startstopBtn.style('color', 'white');
    startstopBtn.style('width', '140px');
    startstopBtn.style('height', '40px');
    startstopBtn.style('text-align', 'center');
    startstopBtn.style('text-decoration', 'none');
    startstopBtn.style('display', 'inline-block');
    startstopBtn.style('font-size', '17px');
    startstopBtn.style('cursor', 'pointer');
    startstopBtn.style('border-radius', '5px');

    // Center the button 
    let buttonX = (p5.windowWidth - startstopBtn.width) / 2;
    let buttonY = (p5.windowHeight - startstopBtn.height) / 2 + p5.windowHeight * 0.35;
    startstopBtn.position(buttonX, buttonY);

    startstopBtn.mousePressed(() => startStopCamera(p5));
  }

  // ----- start camera -----
  function startStopCamera(p5) {
    if (!cameraStarted) {
      startCamera(p5);
      startstopBtn.html('Stop Camera');
    } else {
      if (capture) {
        capture.stop();
        capture.remove();
        capture = null;
      }
      cameraStarted = false;
      startstopBtn.html('Start Camera');
    }
  }

  function startCamera(p5) {
    if (!cameraStarted) {
      capture = p5.createCapture(p5.VIDEO);
      capture.size(p5.windowWidth * 0.8, p5.windowHeight * 0.8);
      capture.hide();
      cameraStarted = true;
    } else {
      capture.stop();
      cameraStarted = false;
    }
  }

  // ----- style canvas -----
  function styleCanvas() {
    cnv.elt.style.border = '3px solid #FF4655';
    cnv.elt.style.borderRadius = '5px';
  }

  // Draw Functions
  const draw = (p5) => {
    p5.background(255);
    centerCanvas(p5);

    // fix img
    let imgWidth, imgHeight;
    let sizeFactor = 0.6;
    if (!cameraStarted && bg_img) {
      if (bg_img.width > bg_img.height) {
        imgWidth = p5.width * sizeFactor;
        imgHeight = bg_img.height * (imgWidth / bg_img.width);
      } else {
        imgHeight = p5.height * sizeFactor;
        imgWidth = bg_img.width * (imgHeight / bg_img.height);
      }

      let imgX = (p5.width - imgWidth) / 2;
      let imgY = (p5.height - imgHeight) / 2;

      p5.image(bg_img, imgX, imgY, imgWidth, imgHeight);

      let transparency = 0.7;
      p5.tint(255, 255 * (1 - transparency));
    }

    // camera
    if (capture) {
      p5.tint(255, 255);
      p5.push();
      p5.translate(p5.width, 0);
      p5.scale(-1, 1);
      p5.image(capture, 0, 0, p5.width, p5.height);
      p5.pop();
    }
  };

  return <Sketch preload={preload} setup={setup} draw={draw} />;
};

export default CountCam;