new p5((sketch) => {
  let posicoes = [];
  let velocidades = [];
  let numBolinhas = 10;
  let cor = [];
  let raio = [];
  let gravidade;
  let desaceleracao = 0.98;

  sketch.setup = () => {
    sketch.createCanvas(640, 480).parent("vetores");

    gravidade = sketch.createVector(0, 0.1);

    for (let i = 0; i < numBolinhas; i++) {
      raio.push(sketch.random(30, 60));

      posicoes.push(
        sketch.createVector(
          sketch.random(30, sketch.width - 30),
          sketch.random(30, sketch.height - 30)
        )
      );

      velocidades.push(
        sketch.createVector(sketch.random(1, 3), sketch.random(1, 3))
      );

      cor.push(
        sketch.color(
          sketch.random(0, 255),
          sketch.random(0, 255),
          sketch.random(0, 255)
        )
      );
    }
  };

  sketch.draw = () => {
    sketch.background(240);


    //Colisão na parede e perda de velocidade
    for (let i = 0; i < posicoes.length; i++) {
      velocidades[i].add(gravidade);
      posicoes[i].add(velocidades[i]);

      if (
        posicoes[i].x > sketch.width - raio[i] / 2 ||
        posicoes[i].x < raio[i] / 2
      ) {
        velocidades[i].x *= -1 * desaceleracao;
      }

      if (
        posicoes[i].y > sketch.height - raio[i] / 2 ||
        posicoes[i].y < raio[i] / 2
      ) {
        velocidades[i].y *= -1 * desaceleracao;
      }

        //Colisão entre bolinhas
      for (let j = i + 1; j < posicoes.length; j++) {
        let dist = p5.Vector.dist(posicoes[i], posicoes[j]);
        let minDist = (raio[i] + raio[j]) / 2;

        if (dist < minDist) {
          let dir = p5.Vector.sub(posicoes[i], posicoes[j]).normalize();

          let overlap = minDist - dist;

          posicoes[i].add(dir.copy().mult(overlap / 2));
          posicoes[j].sub(dir.copy().mult(overlap / 2));

          let normal = p5.Vector.sub(posicoes[j], posicoes[i]).normalize();

          let viProj = p5.Vector.dot(velocidades[i], normal);
          let vjProj = p5.Vector.dot(velocidades[j], normal);

          let viProjFinal = normal.copy().mult(vjProj * desaceleracao);
          let vjProjFinal = normal.copy().mult(viProj * desaceleracao);

          velocidades[i].add(
            p5.Vector.sub(viProjFinal, normal.copy().mult(viProj))
          );
          velocidades[j].add(
            p5.Vector.sub(vjProjFinal, normal.copy().mult(vjProj))
          );
        }
      }

      // Desenho das bolinhas
      sketch.fill(cor[i]);
      sketch.ellipse(posicoes[i].x, posicoes[i].y, raio[i], raio[i]);

      sketch.stroke(0);
    }
  };

  // Adiciona bolinhas ao clicar
  sketch.mousePressed = () => {
    posicoes.push(sketch.createVector(sketch.mouseX, sketch.mouseY));
    velocidades.push(
      sketch.createVector(
        sketch.random(1, 3) * (Math.random() < 0.5 ? -1 : 1),
        sketch.random(1, 3) * (Math.random() < 0.5 ? -1 : 1)
      )
    );
    cor.push(
      sketch.color(
        sketch.random(0, 255),
        sketch.random(0, 255),
        sketch.random(0, 255)
      )
    );
    raio.push(sketch.random(30, 60));
  };
});
