'use strict';

const canvas = document.getElementById('nightsky');
const ctx = canvas.getContext('2d');

// Layout
const height = canvas.height;
let width;

// Sky colors
const sky_col1 = '#000';
const sky_col2 = '#009';
const sky_col3 = '#0F9';
const sky_grad_step1 = 0;
const sky_grad_step2 = 0.25;
const sky_grad_step3 = 1;

// Star densities
const a_stars = 300;
const b_stars = 69;
const c_stars = 33;
const d_stars = 10;
const e_stars = 5;

function drawMountains() {
  const nb_mountains = Math.round(width / 100);

  ctx.beginPath();
  ctx.moveTo(0, height);
  ctx.lineTo(0, height / 2);

  const nb_segments = 2 * (1 + nb_mountains);

  const segments = [];
  let total = 0;
  for (let i = 0; i < nb_segments; i++) {
    const l = Math.random();
    segments[i] = l;
    total += l;
  }

  const scale = width / total;
  for (let i = 0; i < nb_segments; i++) {
    segments[i] = scale * segments[i];
    if (i > 0) segments[i] += segments[i - 1];
  }

  for (let i = 0; i < nb_segments; i++) {
    ctx.lineTo(segments[i], height / 2 + height / 2 * Math.random() * Math.random());
  }

  ctx.lineTo(width, height / 2);
  ctx.lineTo(width, height);

  ctx.closePath();
  ctx.lineWidth = 0;
  ctx.fillStyle = '#000000';
  ctx.fill();
};

function drawSky() {
  const skygradient = ctx.createLinearGradient(0, 0, 0, height);
  skygradient.addColorStop(sky_grad_step1, sky_col1);
  skygradient.addColorStop(sky_grad_step2, sky_col2);
  skygradient.addColorStop(sky_grad_step3, sky_col3);
  ctx.fillStyle = skygradient;
  ctx.fillRect(0, 0, width, height);
};

function drawStars() {
  let i, xrandom, yrandom;

  // A stars
  for (i = 0; i < a_stars; i++) {
    xrandom = Math.floor(Math.random() * width);
    yrandom = Math.floor(Math.random() * height);
    ctx.fillStyle = 'white';
    ctx.fillRect(xrandom, yrandom, 1, 1);
  }

  // B stars
  for (i = 0; i < b_stars; i++) {
    xrandom = Math.floor(Math.random() * width);
    yrandom = Math.floor(Math.random() * height);
    ctx.fillStyle = 'white';
    ctx.fillRect(xrandom, yrandom, 1, 1);
    ctx.fillRect(xrandom, yrandom + 1, 1, 1);
    ctx.fillRect(xrandom, yrandom - 1, 1, 1);
    ctx.fillRect(xrandom - 1, yrandom, 1, 1);
    ctx.fillRect(xrandom + 1, yrandom, 1, 1);
  }

  // C stars
  for (i = 0; i < c_stars; i++) {
    xrandom = Math.floor(Math.random() * width);
    yrandom = Math.floor(Math.random() * height);
    ctx.fillStyle = 'white';
    ctx.fillRect(xrandom, yrandom, 1, 1);
    ctx.fillRect(xrandom, yrandom + 1, 1, 1);
    ctx.fillRect(xrandom, yrandom - 1, 1, 1);
    ctx.fillRect(xrandom - 1, yrandom, 1, 1);
    ctx.fillRect(xrandom + 1, yrandom, 1, 1);
    ctx.fillRect(xrandom, yrandom + 2, 1, 1);
    ctx.fillRect(xrandom, yrandom - 2, 1, 1);
    ctx.fillRect(xrandom - 2, yrandom, 1, 1);
    ctx.fillRect(xrandom + 2, yrandom, 1, 1);
  }

  // D stars
  for (i = 0; i < d_stars; i++) {
    xrandom = Math.floor(Math.random() * width);
    yrandom = Math.floor(Math.random() * height);
    ctx.fillStyle = 'white';
    ctx.fillRect(xrandom, yrandom, 1, 1);

    ctx.fillRect(xrandom, yrandom + 1, 1, 1);
    ctx.fillRect(xrandom, yrandom - 1, 1, 1);
    ctx.fillRect(xrandom - 1, yrandom, 1, 1);
    ctx.fillRect(xrandom + 1, yrandom, 1, 1);
    ctx.fillRect(xrandom, yrandom + 2, 1, 1);
    ctx.fillRect(xrandom, yrandom - 2, 1, 1);
    ctx.fillRect(xrandom - 2, yrandom, 1, 1);
    ctx.fillRect(xrandom + 2, yrandom, 1, 1);
    ctx.fillRect(xrandom + 1, yrandom + 1, 1, 1);
    ctx.fillRect(xrandom - 1, yrandom - 1, 1, 1);
    ctx.fillRect(xrandom - 1, yrandom + 1, 1, 1);
    ctx.fillRect(xrandom + 1, yrandom - 1, 1, 1);
  }

  // E stars
  for (i = 0; i < e_stars; i++) {
    xrandom = Math.floor(Math.random() * width);
    yrandom = Math.floor(Math.random() * height);
    ctx.fillStyle = 'white';
    ctx.fillRect(xrandom, yrandom, 1, 1);
    ctx.fillRect(xrandom, yrandom + 1, 1, 1);
    ctx.fillRect(xrandom, yrandom - 1, 1, 1);
    ctx.fillRect(xrandom - 1, yrandom, 1, 1);
    ctx.fillRect(xrandom + 1, yrandom, 1, 1);
    ctx.fillRect(xrandom, yrandom + 2, 1, 1);
    ctx.fillRect(xrandom, yrandom - 2, 1, 1);
    ctx.fillRect(xrandom - 2, yrandom, 1, 1);
    ctx.fillRect(xrandom + 2, yrandom, 1, 1);
    ctx.fillRect(xrandom, yrandom + 3, 1, 1);
    ctx.fillRect(xrandom, yrandom - 3, 1, 1);
    ctx.fillRect(xrandom - 3, yrandom, 1, 1);
    ctx.fillRect(xrandom + 3, yrandom, 1, 1);
    ctx.fillRect(xrandom + 1, yrandom + 1, 1, 1);
    ctx.fillRect(xrandom - 1, yrandom - 1, 1, 1);
    ctx.fillRect(xrandom - 1, yrandom + 1, 1, 1);
    ctx.fillRect(xrandom + 1, yrandom - 1, 1, 1);
  }
}

window.addEventListener('resize', draw, false);
//TODO window.addEventListener('scroll horizontal !', draw, false);

function draw(e) {
  canvas.width = document.documentElement.clientWidth;
  width = canvas.width;
  drawSky();
  drawStars();
  drawMountains();
}