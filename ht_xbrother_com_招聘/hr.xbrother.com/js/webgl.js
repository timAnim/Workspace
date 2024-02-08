APP.webGL = {
    _this: this,
    statsEnabled: false,
    models: [],
    textures: [],
    featuredTextures: [],
    objects: [],
    mouse: new THREE.Vector2(),
    windowHalfX: window.innerWidth / 2,
    windowHalfY: window.innerHeight / 2,
    raycaster: new THREE.Raycaster(),
    draggingObject: null,
    clock: new THREE.Clock(),
    backgroundPlane: null,

    // shader vars
    BackgroundFragShader: null,
    BackgroundVertShader: null,

    backgroundPaused: true,
    infoBackgroundPaused: true,
    paused: false,
    intensity: 1.0,

    init: function() {

        // set up background scene
        this.canvas = document.getElementById("webgl");
        this.camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000);

        this.camera.position.set(0, 0, 50);
        this.scene = new THREE.Scene();
        // switch to false anatialis and transparent as needed
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: false, alpha: false });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.debug.checkShaderErrors = false;

        // default camera target object
        this.target = new THREE.Object3D();
        this.target.position.set(0, 0, 0);
        this.scene.add(this.target);

        // STATS
        if (this.statsEnabled) {
            this.stats = new Stats();
            $("body").append(this.stats.dom);
        }

        // loading manager
        this.manager = new THREE.LoadingManager();
        this.manager.onProgress = function(item, loaded, total) {
            APP.loader.update(loaded / total);
        };

        this.manager.onLoad = function() {
            // add objects to scene and set initial 3D states
            APP.webGL.initObjects();

            // load backgorund shader 
            if (APP.data.BackgroundFragmentShader && APP.data.BackgroundVertexShader) {
                ShaderLoader(APP.data.BackgroundVertexShader, APP.data.BackgroundFragmentShader, APP.webGL.createBackgroundShader);
            }

        };

        // load textures

        var loader = new THREE.TextureLoader(this.manager);
        $.each(APP.data.textures, function(i, t) {
            loader.load(t.file, function(object) {
                APP.webGL.textures[t.name] = object;
            });
        });

        window.onresize = this.resize;
    },

    onMouseDownWebGL: function(e) {
        console.log("mouse down on webgl");
        _this = APP.webGL;
        e.preventDefault();
        _this.mouse.x = (e.clientX / _this.renderer.domElement.clientWidth) * 2 - 1;
        _this.mouse.y = -(e.clientY / _this.renderer.domElement.clientHeight) * 2 + 1;
        _this.raycaster.setFromCamera(_this.mouse, _this.camera);

        var intersects = _this.raycaster.intersectObjects(_this.objects, true);
        if (intersects.length > 0) {
            var obj = intersects[0].object.data
            if ("link" in obj) {
                APP.go(obj.link, true);
            }
        }
    },

    resize: function() {
        _this = APP.webGL;
        var width = window.innerWidth;
        var height = window.innerHeight;
        _this.camera.aspect = width / height;
        _this.camera.updateProjectionMatrix();
        _this.renderer.setSize(width, height);
        _this.windowHalfX = width / 2;
        _this.windowHalfY = height / 2;
        _this.backgroundPlane.scale.set(110 * _this.camera.aspect, 110, 1);
        //_this.composer.setSize( width, height );
        _this.backgroundUniforms.iResolution.value.x = width;
        _this.backgroundUniforms.iResolution.value.y = height;
        _this.backgroundUniforms.adj.value = .2 - window.innerHeight / window.innerWidth;

        console.log("resize");
    },

    createBackgroundShader: function(v, f) {
        console.log("background shader loaded");
        _this = APP.webGL;
        _this.BackgroundVertexShader = v;
        _this.BackgroundFragmentShader = f;

        // create a bakgorund shader plane
        _this.backgroundUniforms = {
            iTime: { type: "f", value: 100.0 },
            iResolution: { type: "v2", value: new THREE.Vector2() },
            iMouse: { type: "v2", value: new THREE.Vector2() },
            audio1: { type: "f", value: 0.0 },
            adj: { type: "f", value: 0.0 },
            orbOpacity: { type: "f", value: 1.0 },
            intensity: { type: "f", value: 1.0 },
            iChannel0: { type: 't', value: _this.textures['tex1'] }
        };
        _this.backgroundUniforms.iResolution.value.x = window.innerWidth;
        _this.backgroundUniforms.iResolution.value.y = window.innerHeight;

        _this.backgroundUniforms.adj.value = .2 - window.innerHeight / window.innerWidth;

        // create custom shader material
        material = new THREE.ShaderMaterial({
            uniforms: _this.backgroundUniforms,
            vertexShader: _this.BackgroundVertexShader,
            fragmentShader: _this.BackgroundFragmentShader

        });

        // create object mesh, set size so it fills screen
        // base this on resolution from above
        var aspect = window.innerWidth / window.innerHeight;
        _this.backgroundPlane = new THREE.Mesh(geometry, material);

        var geometry = new THREE.PlaneGeometry(1, 1);
        _this.backgroundPlane = new THREE.Mesh(geometry, material);
        _this.backgroundPlane.scale.set(110 * aspect, 110, 1);
        _this.scene.add(_this.backgroundPlane);

        APP.modelsLoaded = true;
        APP.checkPreloadComplete();
    },

    showHome: function() {
        console.log("show home page webgl");
        _this = APP.webGL;
        _this.backgroundPaused = false;
        TweenMax.to(_this.backgroundUniforms.orbOpacity, 2.0, { value: 1.0, ease: Circ.easeInOut });
        // move camra to home position
        // _this.canvas.addEventListener('mousedown', APP.webGL.onMouseDownLanding, false);
        APP.loader.update(0);
    },

    hideHome: function() {
        console.log("hide home page webgl");
        APP.webGL.backgroundPaused = false;
        // APP.webGL.canvas.removeEventListener('mousedown', APP.webGL.onMouseDownLanding, false);

    },

    showWork: function() {
        console.log("show work page webgl");
        _this = APP.webGL;
        _this.backgroundPaused = false;
        TweenMax.to(_this.backgroundUniforms.orbOpacity, 1.0, { value: 0.3 });
    },

    hideWork: function() {
        console.log("hide work page webgl");
        _this = APP.webGL;
        _this.backgroundPaused = false;
    },

    showWorkDetail: function() {
        console.log("show work detail page webgl");
        _this = APP.webGL;
        _this.backgroundPaused = false;
        TweenMax.to(_this.backgroundUniforms.orbOpacity, 1.0, { value: 0.3 });
    },

    hideWorkDetail: function() {
        console.log("hide work detail page webgl");
        _this = APP.webGL;
        _this.backgroundPaused = false;
    },

    showInfo: function() {
        console.log("show info page webgl");
        _this = APP.webGL;
        _this.backgroundPaused = false;
        TweenMax.to(_this.backgroundUniforms.orbOpacity, 1.0, { value: .4 });
    },

    hideInfo: function() {
        console.log("hide info page webgl");
        _this = APP.webGL;
        _this.backgroundPaused = false;
    },


    showPress: function() {
        console.log("show press page webgl");
        _this = APP.webGL;
        _this.backgroundPaused = false;
        TweenMax.to(_this.backgroundUniforms.orbOpacity, 1.0, { value: 0.3 });
    },

    hidePress: function() {
        console.log("hide press page webgl");
        _this = APP.webGL;
        _this.backgroundPaused = false;
    },

    showPressDetail: function() {
        console.log("show press detail page webgl");
        _this = APP.webGL;
        _this.backgroundPaused = false;
        TweenMax.to(_this.backgroundUniforms.orbOpacity, 1.0, { value: 0.3 });
    },

    render: function() {
        _this = APP.webGL;
        var scene = _this.scene;
        var camera = _this.camera;
        var renderer = _this.renderer;
        var d = _this.clock.getDelta();

        if (scene && camera && !_this.backgroundPaused && !_this.paused) {
            if (_this.backgroundUniforms) {
                _this.backgroundUniforms.iTime.value += d;
                _this.backgroundUniforms.audio1.value = 128.0 / 48.0 + Math.random() * .1;
                _this.backgroundUniforms.iMouse.value = APP.mouse;
                _this.backgroundUniforms.intensity.value = APP.webGL.intensity;
                if (!APP.isMobile) {
                    for (var i = 0; i < _this.scene.children.length; i++) {
                        var object = scene.children[i];
                        if (object instanceof THREE.Points) {
                            object.rotation.z = -.03 * _this.backgroundUniforms.iTime.value * (i < 4 ? i + 1 : -(i + 1));
                        }
                    }
                }
            }
            if (!APP.isMobile) {
                _this.camera.position.x += (-APP.mouse.x * .01 - _this.camera.position.x) * .05;
                _this.camera.position.y += (APP.mouse.y * .01 - _this.camera.position.y) * .05;
            }
            renderer.render(scene, camera);

        }

        if (_this.statsEnabled) { _this.stats.update(); }
        requestAnimationFrame(_this.render);
    },

    initObjects: function() {
        console.log("init webgl objects");
        _this = APP.webGL;

        // ambient sprites
        if (!APP.isMobile) {
            var geometry = new THREE.BufferGeometry();
            var vertices = [];
            var materials = [],
                parameters;
            for (var i = 0; i < 350; i++) {
                var x = Math.random() * 60 - 30;
                var y = Math.random() * 60 - 30;
                var z = Math.random() * 60 - 30;
                vertices.push(x, y, z);
            }
            geometry.addAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
            parameters = [
                [
                    [0.3, 0.7, 0.9], _this.textures['sprite1'], .3
                ],
                [
                    [0.3, 0.3, 0.8], _this.textures['sprite2'], .3
                ]
            ];
            for (var i = 0; i < parameters.length; i++) {
                var color = parameters[i][0];
                var sprite = parameters[i][1];
                var size = parameters[i][2];
                materials[i] = new THREE.PointsMaterial({ size: size, map: sprite, blending: THREE.AdditiveBlending, depthTest: false, transparent: true, opacity: .35 });
                materials[i].color.setRGB(color[0], color[1], color[2]);
                var particles = new THREE.Points(geometry, materials[i]);
                particles.rotation.x = Math.random() * 6;
                particles.rotation.y = Math.random() * 6;
                particles.rotation.z = Math.random() * 6;
                _this.scene.add(particles);
            }
        }

        // start animating
        _this.render();

    },

    go: function(state) {
        // handle the state specific aniamtions in the 3D scene
        _this = APP.webGL;

        //show the webgl canvas
        $(_this.canvas).addClass("show");

        switch (state) {
            case "home":
                _this.showHome();
                break;
            case "work":
                _this.showWork();
                break;
            case "workDetail":
                _this.showWorkDetail();
                break;
                // case "prototypes":
                //     _this.showPrototypes();
                //     break;
                // case "prototypesDetail":
                //     _this.showPrototypesDetail();
                //     break;
                // case "art":
                //     _this.showArt();
                //     break;
                // case "artDetail":
                //     _this.showArtDetail();
                //     break;
            case "press":
                _this.showPress();
                break;
            case "pressDetail":
                _this.showPressDetail();
                break;
            case "info":
                _this.showInfo();
                break;

        }
    },

    get2DPosition: function(obj) {
        var obj = app.webGL.models[obj];
        var pos = projectToScreenXY(obj, app.webGL.camera);
        return pos;
    }
}

// Asyncronous shader loader for THREE.js.
// written by Richard Mattka - Render51 Studios.
function ShaderLoader(vertex_url, fragment_url, onLoad, onProgress, onError) {
    var vertex_loader = new THREE.FileLoader(THREE.DefaultLoadingManager);
    vertex_loader.setResponseType('text');
    vertex_loader.load(vertex_url, function(vertex_text) {
        var fragment_loader = new THREE.FileLoader(THREE.DefaultLoadingManager);
        fragment_loader.setResponseType('text');
        fragment_loader.load(fragment_url, function(fragment_text) {
            onLoad(vertex_text, fragment_text);
        });
    }, onProgress, onError);
}