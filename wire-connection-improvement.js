// 와이어 연결 개선 - 드래그 앤 드롭 방식

/**
 * 변경사항:
 * 1. 부품 모서리에 작은 핸들 표시
 * 2. 핸들을 드래그하면 연결 선이 따라움
 * 3. 다른 부품에 드롭하면 연결 생성
 * 4. 연결 과정을 시각적으로 표시
 */

// 추가할 상태 변수
let wireStartNode = null;  // 와이어 시작 부품
let tempWireLine = null;   // 임시 연결 선

// 부품 렌더링 시 핸들 추가
function addComponentHandle(nodeElement) {
  const handle = document.createElement('div');
  handle.className = 'component-handle';
  handle.dataset.role = 'wire-handle';
  
  // 핸들 드래그 시작
  handle.addEventListener('mousedown', (e) => {
    e.stopPropagation();
    wireStartNode = nodeElement.dataset.nodeId;
    tempWireLine = createTempWireLine();
    circuitWireLayer.appendChild(tempWireLine);
  });
  
  nodeElement.appendChild(handle);
}

// 임시 연결 선 생성
function createTempWireLine() {
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('stroke', '#ff6b35');
  line.setAttribute('stroke-width', '2');
  line.setAttribute('stroke-dasharray', '5,5');
  line.setAttribute('class', 'temp-wire');
  return line;
}

// 마우스 움직임 시 임시 선 업데이트
function updateTempWire(event) {
  if (!wireStartNode || !tempWireLine) return;
  
  const startNode = getNodeById(wireStartNode);
  if (!startNode) return;
  
  const workspaceRect = circuitWorkspace.getBoundingClientRect();
  tempWireLine.setAttribute('x1', String(startNode.x + 90));
  tempWireLine.setAttribute('y1', String(startNode.y + 50));
  tempWireLine.setAttribute('x2', String(event.clientX - workspaceRect.left));
  tempWireLine.setAttribute('y2', String(event.clientY - workspaceRect.top));
}

// 다른 부품에 드롭
function dropOnComponent(targetNodeId) {
  if (!wireStartNode || wireStartNode === targetNodeId) {
    cleanupTempWire();
    return;
  }
  
  // 중복 연결 확인
  const exists = circuitModel.wires.some(
    (wire) => (wire.from === wireStartNode && wire.to === targetNodeId) || 
              (wire.from === targetNodeId && wire.to === wireStartNode)
  );
  
  if (!exists) {
    circuitModel.wires.push({ from: wireStartNode, to: targetNodeId });
    persistCircuitModel(languageSelect.value);
    renderCircuitEditor();
    setCircuitStatus('배선을 추가했습니다.');
  }
  
  cleanupTempWire();
}

function cleanupTempWire() {
  wireStartNode = null;
  if (tempWireLine) {
    tempWireLine.remove();
    tempWireLine = null;
  }
}

// CSS 추가 필요
// .component-handle {
//   position: absolute;
//   width: 12px;
//   height: 12px;
//   border-radius: 50%;
//   background: #ff6b35;
//   border: 2px solid #fff;
//   cursor: crosshair;
//   top: 5px;
//   right: 5px;
//   box-shadow: 0 0 4px rgba(255, 107, 53, 0.6);
//   z-index: 100;
// }
// 
// .component-handle:hover {
//   box-shadow: 0 0 8px rgba(255, 107, 53, 1);
//   transform: scale(1.2);
// }

