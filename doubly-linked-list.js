function List()
{
	this.lenght = 0;
	this.tail = null;
	this.head = null;
}

function Node(data)
{
	this.data = data;
	this.next = null;
	this.prev = null;
}

List.prototype.append = function(data) {
	var node =  new Node(data)

	if(this.lenght == 0){
		this.head = node;
		this.tail = node;
	}
	else{
		this.tail.next = node;
		node.prev = this.tail;
		this.tail = node;
	}

	this.lenght++;
	return this;
};

List.prototype.deleteAt = function(index) {

	var deleletedNode = this.at(index);

	if(deleletedNode == this.head){
		this.head = this.head.next;

		if(!this.head){
			this.tail = null;
		}
		else{
			this.head.prev = null;
		}
	} 
	else if(deleletedNode == this.tail){
		this.tail = this.tail.prev;
		this.tail.next = null;
	}
	else{
		if(index <= this.lenght / 2){
			var direction = "next", currentNode = this.head;
		}
		else{
			direction = "prev", currentNode = this.tail;
			index = this.lenght - 1 - index;
		}

		var i =1, node = currentNode[direction];
		while(i < index){
			node = node[direction];
			i++;
		}

		node.next.prev = node.prev;
		node.prev.next = node.next;
	}
	this.lenght--;
	return this;
};		

List.prototype.at = function(index) {

	if(typeof index != "number")
		throw new Error ("index is not a Number.");
	
	if(index >= this.lenght || index < 0)
		throw new Error ("index out of range.");
	
	if(index == 0){
		return this.head;
	}
	else if (index == this.lenght - 1){
		return this.tail;
	}
	else{
		if(index <= this.lenght / 2){
			var direction = "next", currentNode = this.head;
		}
		else{
			direction = "prev", currentNode = this.tail;
			index = this.lenght - 1 - index;
		}

		var i =1, node = currentNode[direction];
		while(i < index){
			node = node[direction];
			i++;
		}
		return node;
	}
};

List.prototype.insertAt = function(data, index) {
	if(index === this.lenght)
		this.append(data);

	var node = new Node(data);

	 if(index === 0){
		this.head.prev = node;
		node.next = this.head;
		this.head = node;
	}
	else{
		var currentNode = this.at(index);
		currentNode.prev.next = node;
		node.prev = currentNode.prev;
		currentNode.prev = node;
		node.next = currentNode; 
	}
	this.lenght++;
	return this;
};

List.prototype.indexOf = function(data) {
	var i = 0, currentNode = this.head;
	while(i < this.lenght){
		if(currentNode.data === data)
			return i;
		currentNode = currentNode.next;
		i++;
	}
};

List.prototype.each = function(func) {
	currentNode = this.head;
	while(currentNode){	
		func(currentNode.data);
		currentNode = currentNode.next;
	}
	return this;
};

List.prototype.reverse = function() {
	currentNode = this.head;

	while(currentNode){	
		var temp = currentNode.next;
		currentNode.next = currentNode.prev;
		currentNode.prev = temp;
		currentNode = currentNode.prev;
	}
	temp = this.tail;
	this.tail = this.head;
	this.head = temp;
	return this;
};