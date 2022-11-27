class Snake {
    constructor(){
      this.x = 231;
      this.y = 300;
      this.width = 20;
      this.height = 20;
    }

    drawSnake(){
      ctx.fillStyle = 'blue';
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }   

    moveSnake(keyCode){
      ctx.clearRect(this.x, this.y, this.width, this.height);
      switch(keyCode){
        case 37: //left
        if(this.x > -1){
          this.x -= 10;
        }
          break;
        case 39: //right
        if (this.x < 685 ){
          this.x += 10;
        }
          break;
          case 38: //up
          if(this.y>-1){
             this.y -= 10;
          }
          break;
          case 40: //down
         if(this.y<481){
             this.y += 10;
         }
      }
    }
  }