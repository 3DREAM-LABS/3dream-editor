<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>3DREAM LABS - 3D Modeling</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/examples/js/controls/OrbitControls.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            overflow: hidden;
            background-color: #f5f5f5;
        }
        
        #header {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 50px;
            background-color: #1a73e8;
            color: white;
            display: flex;
            align-items: center;
            padding: 0 15px;
            z-index: 100;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        #logo {
            font-size: 20px;
            font-weight: bold;
            margin-right: 30px;
        }
        
        .header-btn {
            padding: 6px 12px;
            margin-right: 10px;
            border: none;
            border-radius: 4px;
            background-color: rgba(255,255,255,0.1);
            color: white;
            cursor: pointer;
            font-size: 14px;
            transition: background-color 0.2s;
        }
        
        .header-btn:hover {
            background-color: rgba(255,255,255,0.2);
        }
        
        #workplane-controls {
            margin-left: auto;
            display: flex;
            align-items: center;
        }
        
        #workplane-controls label {
            margin-right: 8px;
            font-size: 14px;
        }
        
        #grid-size {
            width: 60px;
            padding: 3px 6px;
            border-radius: 4px;
            border: 1px solid #ddd;
            font-size: 14px;
        }
        
        #fullscreen-btn {
            background: none;
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
            margin-left: 15px;
        }
        
        #shapes-panel {
            position: absolute;
            top: 50px;
            left: 0;
            width: 200px;
            height: calc(100% - 50px);
            background-color: white;
            border-right: 1px solid #ddd;
            z-index: 90;
            overflow-y: auto;
            padding: 10px;
        }
        
        .panel-header {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 10px;
            padding-bottom: 5px;
            border-bottom: 1px solid #eee;
        }
        
        .shape-item {
            display: flex;
            align-items: center;
            padding: 8px;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        
        .shape-item:hover {
            background-color: #f0f0f0;
        }
        
        .shape-icon {
            width: 30px;
            height: 30px;
            background-color: #2196f3;
            border-radius: 3px;
            margin-right: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
        }
        
        .shape-name {
            font-size: 14px;
        }
        
        #tools-panel {
            position: absolute;
            top: 50px;
            right: 0;
            width: 200px;
            height: calc(100% - 50px);
            background-color: white;
            border-left: 1px solid #ddd;
            z-index: 90;
            overflow-y: auto;
            padding: 10px;
        }
        
        #tools-panel .panel-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .tool-item {
            display: flex;
            align-items: center;
            padding: 8px;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        
        .tool-item:hover {
            background-color: #f0f0f0;
        }
        
        .tool-item.active {
            background-color: #e3f2fd;
        }
        
        .tool-icon {
            width: 24px;
            height: 24px;
            margin-right: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
        }
        
        .tool-name {
            font-size: 14px;
        }
        
        #canvas-container {
            position: absolute;
            top: 50px;
            left: 200px;
            width: calc(100% - 400px);
            height: calc(100% - 50px);
            background-color: #e9edf2;
        }
        
        #footer {
            position: absolute;
            bottom: 0;
            left: 200px;
            width: calc(100% - 400px);
            height: 30px;
            background-color: #f5f5f5;
            border-top: 1px solid #ddd;
            display: flex;
            align-items: center;
            padding: 0 15px;
            font-size: 12px;
            color: #666;
        }
        
        .export-dialog {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 300px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            padding: 20px;
            z-index: 1000;
            display: none;
        }
        
        .export-dialog h3 {
            margin-bottom: 15px;
            color: #333;
        }
        
        .export-option {
            display: block;
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            border: none;
            border-radius: 4px;
            background-color: #f5f5f5;
            cursor: pointer;
            text-align: left;
            transition: background-color 0.2s;
        }
        
        .export-option:hover {
            background-color: #e0e0e0;
        }
        
        .close-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
            color: #999;
        }
        
        .close-btn:hover {
            color: #333;
        }
        
        .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            z-index: 999;
            display: none;
        }
        
        /* Helper styles */
        .hidden {
            display: none;
        }
        
        .visible {
            display: block;
        }
    </style>
</head>
<body>
    <!-- Header -->
    <div id="header">
        <div id="logo">3DREAM LABS</div>
        <button class="header-btn" id="import-btn">Import</button>
        <button class="header-btn" id="export-btn">Export</button>
        <div id="workplane-controls">
            <label for="grid-size">Grid Size:</label>
            <input type="number" id="grid-size" min="1" max="100" value="20">
        </div>
        <button id="fullscreen-btn" title="Fullscreen">⛶</button>
    </div>
    
    <!-- Shapes Panel (Left) -->
    <div id="shapes-panel">
        <div class="panel-header">Basic Shapes</div>
        <div class="shape-item" data-shape="box">
            <div class="shape-icon">□</div>
            <div class="shape-name">Box</div>
        </div>
        <div class="shape-item" data-shape="cylinder">
            <div class="shape-icon">○</div>
            <div class="shape-name">Cylinder</div>
        </div>
        <div class="shape-item" data-shape="sphere">
            <div class="shape-icon">●</div>
            <div class="shape-name">Sphere</div>
        </div>
        <div class="shape-item" data-shape="cone">
            <div class="shape-icon">▲</div>
            <div class="shape-name">Cone</div>
        </div>
        <div class="shape-item" data-shape="torus">
            <div class="shape-icon">⊗</div>
            <div class="shape-name">Torus</div>
        </div>
        <div class="shape-item" data-shape="prism">
            <div class="shape-icon">△</div>
            <div class="shape-name">Prism</div>
        </div>
        
        <div class="panel-header" style="margin-top: 20px;">Letters</div>
        <div class="shape-item" data-shape="text">
            <div class="shape-icon">A</div>
            <div class="shape-name">Text</div>
        </div>
    </div>
    
    <!-- 3D Canvas (Center) -->
    <div id="canvas-container"></div>
    
    <!-- Footer -->
    <div id="footer">
        <div id="coordinates">X: 0.00 Y: 0.00 Z: 0.00</div>
    </div>
    
    <!-- Tools Panel (Right) -->
    <div id="tools-panel">
        <div class="panel-header">
            Edit Tools
            <div id="object-name">No selection</div>
        </div>
        <div class="tool-item active" data-tool="move">
            <div class="tool-icon">↕</div>
            <div class="tool-name">Move</div>
        </div>
        <div class="tool-item" data-tool="rotate">
            <div class="tool-icon">↻</div>
            <div class="tool-name">Rotate</div>
        </div>
        <div class="tool-item" data-tool="scale">
            <div class="tool-icon">⇲</div>
            <div class="tool-name">Resize</div>
        </div>
        <div class="tool-item" data-tool="extrude">
            <div class="tool-icon">↑</div>
            <div class="tool-name">Extrude</div>
        </div>
        <div class="tool-item" data-tool="intrude">
            <div class="tool-icon">↓</div>
            <div class="tool-name">Intrude</div>
        </div>
        <div class="tool-item" data-tool="bevel">
            <div class="tool-icon">⌓</div>
            <div class="tool-name">Bevel</div>
        </div>
        <div class="tool-item" data-tool="mirror">
            <div class="tool-icon">⇄</div>
            <div class="tool-name">Mirror</div>
        </div>
        <div class="tool-item" data-tool="align">
            <div class="tool-icon">≡</div>
            <div class="tool-name">Align</div>
        </div>
        
        <div class="panel-header" style="margin-top: 20px;">Properties</div>
        <div style="padding: 10px; font-size: 14px; color: #666;">
            Select an object to edit properties
        </div>
    </div>
    
    <!-- Export Dialog -->
    <div class="overlay" id="export-overlay"></div>
    <div class="export-dialog" id="export-dialog">
        <button class="close-btn" id="close-export">×</button>
        <h3>Export Model</h3>
        <button class="export-option" data-format="stl">STL - 3D Printing</button>
        <button class="export-option" data-format="obj">OBJ - 3D Modeling</button>
        <button class="export-option" data-format="gltf">GLTF - Web/Game Ready</button>
    </div>
    
    <script>
        // Global variables
        let scene, camera, renderer, controls;
        let grid, gridSize = 20;
        let selectedObject = null;
        let currentTool = 'move';
        let objects = [];
        
        // Initialize Three.js scene
        function init() {
            // Setup scene
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xe9edf2);
            
            // Setup camera
            camera = new THREE.PerspectiveCamera(
                45, 
                (window.innerWidth - 400) / (window.innerHeight - 50), 
                0.1, 
                1000
            );
            camera.position.set(20, 20, 20);
            camera.lookAt(0, 0, 0);
            
            // Setup renderer
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(window.innerWidth - 400, window.innerHeight - 50);
            document.getElementById('canvas-container').appendChild(renderer.domElement);
            
            // Add lighting
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
            scene.add(ambientLight);
            
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(10, 20, 15);
            scene.add(directionalLight);
            
            // Create grid
            createGrid(gridSize);
            
            // Setup orbit controls
            controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            
            // Add axes helper
            const axesHelper = new THREE.AxesHelper(5);
            scene.add(axesHelper);
            
            // Handle window resize
            window.addEventListener('resize', onWindowResize);
            
            // Setup event listeners
            setupEventListeners();
            
            // Start animation loop
            animate();
        }
        
        function createGrid(size) {
            // Remove existing grid if it exists
            if (grid) scene.remove(grid);
            
            // Create a new grid
            grid = new THREE.GridHelper(size, size, 0x888888, 0xdddddd);
            scene.add(grid);
        }
        
        function onWindowResize() {
            camera.aspect = (window.innerWidth - 400) / (window.innerHeight - 50);
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth - 400, window.innerHeight - 50);
        }
        
        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            updateCoordinatesDisplay();
            renderer.render(scene, camera);
        }
        
        function updateCoordinatesDisplay() {
            if (selectedObject) {
                const pos = selectedObject.position;
                document.getElementById('coordinates').textContent = 
                    `X: ${pos.x.toFixed(2)} Y: ${pos.y.toFixed(2)} Z: ${pos.z.toFixed(2)}`;
            } else {
                document.getElementById('coordinates').textContent = 'X: 0.00 Y: 0.00 Z: 0.00';
            }
        }
        
        function setupEventListeners() {
            // Shape item clicks
            document.querySelectorAll('.shape-item').forEach(item => {
                item.addEventListener('click', function() {
                    const shapeType = this.getAttribute('data-shape');
                    addShape(shapeType);
                });
            });
            
            // Tool item clicks
            document.querySelectorAll('.tool-item').forEach(item => {
                item.addEventListener('click', function() {
                    document.querySelectorAll('.tool-item').forEach(el => el.classList.remove('active'));
                    this.classList.add('active');
                    currentTool = this.getAttribute('data-tool');
                });
            });
            
            // Grid size change
            document.getElementById('grid-size').addEventListener('change', function() {
                gridSize = parseInt(this.value);
                createGrid(gridSize);
            });
            
            // Export button
            document.getElementById('export-btn').addEventListener('click', function() {
                document.getElementById('export-overlay').classList.add('visible');
                document.getElementById('export-dialog').classList.add('visible');
            });
            
            // Close export dialog
            document.getElementById('close-export').addEventListener('click', function() {
                document.getElementById('export-overlay').classList.remove('visible');
                document.getElementById('export-dialog').classList.remove('visible');
            });
            
            // Export format selection
            document.querySelectorAll('.export-option').forEach(option => {
                option.addEventListener('click', function() {
                    const format = this.getAttribute('data-format');
                    exportModel(format);
                    document.getElementById('export-overlay').classList.remove('visible');
                    document.getElementById('export-dialog').classList.remove('visible');
                });
            });
            
            // Fullscreen button
            document.getElementById('fullscreen-btn').addEventListener('click', toggleFullScreen);
            
            // Canvas click for object selection
            renderer.domElement.addEventListener('click', onCanvasClick);
        }
        
        function addShape(shapeType) {
            let geometry, material, shape;
            const color = 0x3498db;
            
            material = new THREE.MeshStandardMaterial({ 
                color: color,
                metalness: 0.1,
                roughness: 0.7
            });
            
            switch(shapeType) {
                case 'box':
                    geometry = new THREE.BoxGeometry(4, 4, 4);
                    break;
                case 'cylinder':
                    geometry = new THREE.CylinderGeometry(2, 2, 4, 32);
                    break;
                case 'sphere':
                    geometry = new THREE.SphereGeometry(2, 32, 32);
                    break;
                case 'cone':
                    geometry = new THREE.ConeGeometry(2, 4, 32);
                    break;
                case 'torus':
                    geometry = new THREE.TorusGeometry(2, 0.5, 16, 32);
                    break;
                case 'prism':
                    geometry = new THREE.CylinderGeometry(2, 2, 4, 3);
                    break;
                case 'text':
                    // In a real implementation, this would use TextGeometry
                    // For this demo, we'll use a box as placeholder
                    geometry = new THREE.BoxGeometry(6, 4, 1);
                    break;
                default:
                    geometry = new THREE.BoxGeometry(4, 4, 4);
            }
            
            shape = new THREE.Mesh(geometry, material);
            shape.position.set(0, 2, 0);
            shape.userData.type = shapeType;
            shape.userData.name = `${shapeType}-${objects.length}`;
            
            scene.add(shape);
            objects.push(shape);
            
            // Select the new shape
            selectObject(shape);
        }
        
        function selectObject(object) {
            // Deselect previous object
            if (selectedObject) {
                selectedObject.material.emissive.setHex(0x000000);
            }
            
            // Select new object
            selectedObject = object;
            
            if (selectedObject) {
                selectedObject.material.emissive.setHex(0x333333);
                document.getElementById('object-name').textContent = selectedObject.userData.name || 'Selected';
            } else {
                document.getElementById('object-name').textContent = 'No selection';
            }
        }
        
        function onCanvasClick(event) {
            // Calculate mouse position in normalized device coordinates
            const canvasBounds = renderer.domElement.getBoundingClientRect();
            const mouse = new THREE.Vector2();
            mouse.x = ((event.clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1;
            mouse.y = -((event.clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1;
            
            // Create raycaster
            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, camera);
            
            // Find intersected objects
            const intersects = raycaster.intersectObjects(objects);
            
            if (intersects.length > 0) {
                // Select the first intersected object
                selectObject(intersects[0].object);
            } else {
                // Deselect if clicking empty space
                selectObject(null);
            }
        }
        
        function exportModel(format) {
            // In a real implementation, this would use proper exporters
            console.log(`Exporting model as ${format}`);
            alert(`Your model would be exported as ${format.toUpperCase()} format`);
        }
        
        function toggleFullScreen() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(err => {
                    alert(`Error attempting to enable fullscreen: ${err.message}`);
                });
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        }
        
        // Tool functions (placeholders for demo)
        function applyTool(tool) {
            if (!selectedObject) return;
            
            switch(tool) {
                case 'extrude':
                    // Simple demonstration of extrude
                    if (selectedObject.userData.type === 'box') {
                        selectedObject.scale.y += 0.5;
                    }
                    break;
                case 'intrude':
                    // Simple demonstration of intrude
                    if (selectedObject.userData.type === 'box') {
                        selectedObject.scale.y = Math.max(0.1, selectedObject.scale.y - 0.5);
                    }
                    break;
                case 'bevel':
                    // In a real implementation, this would apply beveling
                    alert("Bevel would be applied to the selected object");
                    break;
            }
        }
        
        // Initialize the application when DOM is loaded
        window.addEventListener('DOMContentLoaded', init);
    </script>
</body>
</html>
