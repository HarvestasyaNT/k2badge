
function Poster() {
    this.sideLength = side;
    this.hexHeight = Math.sin(hexagonAngle) * sideLength;
    this.hexRadius = Math.cos(hexagonAngle) * sideLength;
    this.hexRectangleHeight = sideLength + 2 * hexHeight;
    this.hexRectangleWidth = 2 * hexRadius;
    this.centerx = (hexRectangleHeight * 5 / 4 - hexRectangleWidth) / 2;
    this.centery = (hexRectangleHeight * 5 / 4 - hexRectangleHeight) / 2 + 5;
};

Poster.prototype = {
    constuctor: Poster
};
function Badge() {
    this.sideLength = side;
    this.hexHeight = Math.sin(hexagonAngle) * sideLength;
    this.hexRadius = Math.cos(hexagonAngle) * sideLength;
    this.hexRectangleHeight = sideLength + 2 * hexHeight;
    this.hexRectangleWidth = 2 * hexRadius;
    this.centerx = (hexRectangleHeight * 5 / 4 - hexRectangleWidth) / 2;
    this.centery = (hexRectangleHeight * 5 / 4 - hexRectangleHeight) / 2 + 5;
};

function FleetBadge() {
    this.sideLength = side;
    this.hexHeight = Math.sin(hexagonAngle) * sideLength;
    this.hexRadius = Math.cos(hexagonAngle) * sideLength;
    this.hexRectangleHeight = sideLength + 2 * hexHeight;
    this.hexRectangleWidth = 2 * hexRadius;
    this.centerx = (hexRectangleHeight * 5 / 4 - hexRectangleWidth) / 2;
    this.centery = (hexRectangleHeight * 5 / 4 - hexRectangleHeight) / 2 + 5;
};

export const drawText = (text, posx, posy, width) => {
    ctx.save();
    ctx.lineWidth = typeof width !== 'undefined' ? width : 2;
    ctx.strokeText(text, posx, posy);
    ctx.fillText(text, posx, posy);
    ctx.restore();
};

export const drawHexagon = (img, x, y, checked, color) => {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x + hexRadius, y);
    ctx.lineTo(x + hexRectangleWidth, y + hexHeight);
    ctx.lineTo(x + hexRectangleWidth, y + hexHeight + sideLength);
    ctx.lineTo(x + hexRadius, y + hexRectangleHeight);
    ctx.lineTo(x, y + sideLength + hexHeight);
    ctx.lineTo(x, y + hexHeight);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = color ? color : "white";
    ctx.globalAlpha = $("#hexOpa").val() ? $("#hexOpa").val() : 0;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.clip();

    if (img && checked) {
        ctx.drawImage(img, x - centerx, y - centery, hexRectangleHeight * 5 / 4, hexRectangleHeight * 5 / 4);
    }
    ctx.restore();
};

export const drawProgress = (checked, total, offset) => {
    var progressrow = 530;
    var progressrowbox = 540;
    var ships = checked + "/" + total;
    var shipPct = checked / total;
    var barWidth = 300;
    var grd = ctx.createLinearGradient(progressrowbox, 0, progressrowbox + barWidth, 0);

    ctx.save();
    ctx.strokeRect(progressrowbox, c.height - offset, barWidth, 8);

    grd.addColorStop(0, "#A00000");
    grd.addColorStop(0.33, "#FF9900");
    grd.addColorStop(0.66, "#DDDD33");
    grd.addColorStop(1, "#00A000");
    ctx.fillStyle = grd;
    ctx.fillRect(progressrowbox, c.height - offset, (barWidth * shipPct).toFixed(), 8);
    ctx.restore();

    ctx.font = "20px " + numberfont;
    drawText(ships + " (" + (shipPct * 100).toFixed() + "%)", progressrowbox + barWidth, c.height - 20, 3);
};

