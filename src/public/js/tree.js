(function(){
	function Point(id, x, y, flag){
		this.id = id;
		this.x = x;
		this.y = y;
		this.flag = flag;
	}

	function Tree(max){
		this.points = [];
		this.layer = 1;
		this.obj = document.getElementById("svg");
		this.max = max;
		this.flag = 0;
	}

	Tree.prototype.init = function(){
		var containerWidth = $("#tree").width(),
			containerHeight = $("#tree").height();

		var point = new Point("p0", containerWidth/2, containerHeight, 0);

		this.points.push(point)
	}

	Tree.prototype.drawLine = function(curPoint, nextPoint, direction){
		var id = nextPoint.id;
		var el = document.createElementNS('http://www.w3.org/2000/svg', "line");
		el.setAttribute("x1",curPoint.x);
		el.setAttribute("y1",curPoint.y);
		el.setAttribute("x2",curPoint.x);
		el.setAttribute("y2",curPoint.y);
		el.setAttribute("stroke","#999");
		el.setAttribute("stroke-width",1);
		this.obj.appendChild(el);
		var ela1 = document.createElementNS('http://www.w3.org/2000/svg', "animate");
		ela1.setAttribute("attributeType","XML");
		ela1.setAttribute("attributeName","x2");
		ela1.setAttribute("form",curPoint.x);
		ela1.setAttribute("to", nextPoint.x);
		ela1.setAttribute("dur", "0.5s");
		ela1.setAttribute("fill", "freeze");
		ela1.setAttribute("begin", curPoint.id + ".end");
		ela1.setAttribute("id",id);
		var ela2 = document.createElementNS('http://www.w3.org/2000/svg', "animate");
		ela2.setAttribute("attributeType","XML");
		ela2.setAttribute("attributeName","y2");
		ela2.setAttribute("form",curPoint.y);
		ela2.setAttribute("to", nextPoint.y);
		ela2.setAttribute("dur", "0.5s");
		ela2.setAttribute("fill", "freeze");
		ela2.setAttribute("begin", curPoint.id + ".end");
		el.appendChild(ela1);
		el.appendChild(ela2);
	}

	Tree.prototype.drawCircle = function(point){
		var el = document.createElementNS('http://www.w3.org/2000/svg', "circle");
		el.setAttribute("cx",point.x);
		el.setAttribute("cy",point.y);
		el.setAttribute("r", 0);
		el.setAttribute("fill","rgba(153,153,153,0.5)");
		this.obj.appendChild(el);
		var ela1 = document.createElementNS('http://www.w3.org/2000/svg', "animate");
		ela1.setAttribute("attributeType","XML");
		ela1.setAttribute("attributeName","r");
		ela1.setAttribute("form", 0);
		ela1.setAttribute("to", 2);
		ela1.setAttribute("dur", "0.5s");
		ela1.setAttribute("fill", "freeze");
		ela1.setAttribute("begin", point.id + ".end");
		el.appendChild(ela1);
	}

	Tree.prototype.calPoint = function(layer, point, flag, direction){
		var nx, ny, nid, npoint, nflag;

		nflag = direction ? flag + 1 : flag - 1;
		nid = direction ? "pl" + layer : "pr" + layer;
		nx = point.x - (11-layer)*(8+layer) * Math.sin(2 * Math.PI / 360 * 15 * nflag);
		ny = point.y - (11-layer)*(8+layer) * Math.cos(2 * Math.PI / 360 * 15 * nflag);
		npoint = new Point(nid, nx, ny, nflag);

		return npoint;
	}

	Tree.prototype.toLeft = function(layer, point){
		var self = this;
		var lpoint;
		
		if(layer > this.max){
			self.drawCircle(point);
		}else{
			lpoint = self.calPoint(layer, point, point.flag, 1);
			self.drawLine(point, lpoint, 1);
			self.toLeft(layer+1,lpoint);
			self.toRight(layer+1,lpoint);
		}
	}

	Tree.prototype.toRight = function(layer, point){
		var self = this;
		var rpoint;
		
		if(layer > this.max){
			self.drawCircle(point);
		}else{
			rpoint = self.calPoint(layer, point, point.flag, 0);
			self.drawLine(point, rpoint, 1);
			self.toLeft(layer+1,rpoint);
			self.toRight(layer+1,rpoint);
		}
	}

	var treeObj = new Tree(10);
	treeObj.init();
	treeObj.toLeft(1, treeObj.points[0]);
	treeObj.toRight(1, treeObj.points[0]);
})();