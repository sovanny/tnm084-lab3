	window.requestAnimFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
    
      var WIDTH = 800,
          HEIGHT = 500;
    
      var VIEW_ANGLE = 45,
          ASPECT = WIDTH / HEIGHT,
          NEAR = 0.1,
          FAR = 10000;
      
      var $container = $('#container');
      
      var renderer = new THREE.WebGLRenderer();
      var camera = new THREE.Camera(  VIEW_ANGLE,
                                      ASPECT,
                                      NEAR,
                                      FAR  );
      var scene = new THREE.Scene();

      camera.position.z = 300;
      
      renderer.setSize(WIDTH, HEIGHT);

      $container.append(renderer.domElement);
      
      var uniforms = {
          timeframe: {
              type: 'f', 
              value: 0
          }
      };

      var shaderMaterial = new THREE.MeshShaderMaterial({
          uniforms:     	uniforms,
          //attributes:     attributes,
          vertexShader:   $('#vertexshader').text(),
          fragmentShader: $('#fragmentshader').text()
      });
      
      var radius = 80, segments = 24, rings = 24;
      
      var sphere = new THREE.Mesh(
         new THREE.Sphere(radius, segments, rings),
         shaderMaterial);
         
      scene.addChild(sphere);
      
      var frame = 0;
      
      function update() {
      
          uniforms.timeframe.value = frame;
          frame += 0.02;
          renderer.render(scene, camera);
          
          requestAnimFrame(update);
      }
      requestAnimFrame(update);