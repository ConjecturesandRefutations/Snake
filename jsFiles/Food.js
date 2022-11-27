class Food {
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
      this.width = 20;
      this.height = 20;
    }

    drawFood(){
      ctx.fillStyle = 'red';
      ctx.fillRect(this.x, this.y, this.width, this.height);
    } 
  }