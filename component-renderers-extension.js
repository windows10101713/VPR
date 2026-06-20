// 확장 컴포넌트 렌더러 함수들 (app.js의 renderComponentSvg 함수에 추가)

// Breadboard rendering
function renderBreadboard(svg) {
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", "5");
  rect.setAttribute("y", "8");
  rect.setAttribute("width", "60");
  rect.setAttribute("height", "32");
  rect.setAttribute("rx", "2");
  rect.setAttribute("fill", "#cc0000");
  rect.setAttribute("stroke", "#660000");
  rect.setAttribute("stroke-width", "1");
  svg.appendChild(rect);
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 5; j++) {
      const hole = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      hole.setAttribute("cx", String(13 + j * 10));
      hole.setAttribute("cy", String(14 + i * 8));
      hole.setAttribute("r", "2");
      hole.setAttribute("fill", "#000");
      svg.appendChild(hole);
    }
  }
}

// Buzzer rendering
function renderBuzzer(svg) {
  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", "25");
  circle.setAttribute("cy", "25");
  circle.setAttribute("r", "12");
  circle.setAttribute("fill", "#1a1a1a");
  circle.setAttribute("stroke", "#ffaa00");
  circle.setAttribute("stroke-width", "2");
  svg.appendChild(circle);
  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("x", "25");
  text.setAttribute("y", "29");
  text.setAttribute("font-size", "14");
  text.setAttribute("fill", "#ffaa00");
  text.setAttribute("text-anchor", "middle");
  text.textContent = "♪";
  svg.appendChild(text);
}

// Relay rendering
function renderRelay(svg) {
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", "10");
  rect.setAttribute("y", "10");
  rect.setAttribute("width", "30");
  rect.setAttribute("height", "30");
  rect.setAttribute("rx", "3");
  rect.setAttribute("fill", "#2196F3");
  rect.setAttribute("stroke", "#0d47a1");
  rect.setAttribute("stroke-width", "1.5");
  svg.appendChild(rect);
  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("x", "25");
  text.setAttribute("y", "32");
  text.setAttribute("font-size", "10");
  text.setAttribute("fill", "#fff");
  text.setAttribute("text-anchor", "middle");
  text.textContent = "RLY";
  svg.appendChild(text);
}

// Wireless module rendering
function renderWirelessModule(svg, moduleType) {
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", "8");
  rect.setAttribute("y", "8");
  rect.setAttribute("width", "50");
  rect.setAttribute("height", "34");
  rect.setAttribute("rx", "2");
  rect.setAttribute("fill", "#4CAF50");
  rect.setAttribute("stroke", "#2E7D32");
  rect.setAttribute("stroke-width", "1.5");
  svg.appendChild(rect);
  
  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("x", "33");
  text.setAttribute("y", "23");
  text.setAttribute("font-size", "8");
  text.setAttribute("fill", "#fff");
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("font-weight", "bold");
  const typeLabel = moduleType.toUpperCase().substring(0, 3);
  text.textContent = typeLabel;
  svg.appendChild(text);
  
  const wave = document.createElementNS("http://www.w3.org/2000/svg", "path");
  wave.setAttribute("d", "M 40 12 Q 43 10 46 12");
  wave.setAttribute("stroke", "#fff");
  wave.setAttribute("stroke-width", "1");
  wave.setAttribute("fill", "none");
  svg.appendChild(wave);
}
