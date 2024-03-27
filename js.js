function dijkstra(graph, start) {
  const distances = {};
  const visited = {};
  const queue = new PriorityQueue();

  for (let vertex in graph) {
    distances[vertex] = Infinity;
    visited[vertex] = false;
  }

  distances[start] = 0;

  queue.enqueue(start, 0);

  while (!queue.isEmpty()) {
    const currentVertex = queue.dequeue().data;
    if (visited[currentVertex]) continue;
    visited[currentVertex] = true;

    for (let neighbor in graph[currentVertex]) {
      const weight = graph[currentVertex][neighbor];
      const totalDistance = distances[currentVertex] + weight;
      if (totalDistance < distances[neighbor]) {
        distances[neighbor] = totalDistance;
        queue.enqueue(neighbor, totalDistance);
      }
    }
  }

  return distances;
}

class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(data, priority) {
    this.queue.push({ data, priority });
    this.sort();
  }

  dequeue() {
    return this.queue.shift();
  }

  isEmpty() {
    return !this.queue.length;
  }

  sort() {
    this.queue.sort((a, b) => a.priority - b.priority);
  }
}

const graph = {
  A: { B: 4, C: 2 },
  B: { A: 4, C: 5, D: 10 },
  C: { A: 2, B: 5, D: 3 },
  D: { B: 10, C: 3 },
};

console.log(dijkstra(graph, "A"));
