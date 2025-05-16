new p5((sketch) => {  
    let posicoes = [];
    let velocidades = [];
    let numBolinhas = 10; 

    sketch.setup = () => {
        sketch.createCanvas(640, 480).parent('vetores');

        for (let i = 0; i < numBolinhas; i++) {
           
            posicoes.push(sketch.createVector(
                sketch.random(30, sketch.width - 30),
                sketch.random(30, sketch.height - 30)
            ));

            
            velocidades.push(sketch.createVector(
                sketch.random(1, 3),
                sketch.random(1, 3)
            ));
        }
    };

    sketch.draw = () => {
        sketch.background(240);

   
        for (let i = 0; i < numBolinhas; i++) {
            
           
            posicoes[i].add(velocidades[i]);

            
            if (posicoes[i].x > sketch.width || posicoes[i].x < 0) {
                velocidades[i].x *= -1;
            }

       
            if (posicoes[i].y > sketch.height || posicoes[i].y < 0) {
                velocidades[i].y *= -1;
            }

           
            sketch.fill(255, 0, 0);
            sketch.ellipse(posicoes[i].x, posicoes[i].y, 30, 30);

            
            sketch.stroke(0);
            sketch.line(
                posicoes[i].x,
                posicoes[i].y,
                posicoes[i].x + velocidades[i].x * 10,
                posicoes[i].y + velocidades[i].y * 10
            );
        }
            };
});