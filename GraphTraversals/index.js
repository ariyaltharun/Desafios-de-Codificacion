var nodes = document.querySelectorAll(".node")

var graph = [];
function reshape() {
    for (let i=0; i<36; i+=6) {
        let list = []
        for (let j=i, k=0; j<i+6; j++, k++) {
            // nodes[j].innerText = "1"
            list.push(nodes[j])
        }   
        graph.push(list)
    }
}

var visited = [
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false]
] 
var found = false

// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

function dfs(next_node) {
    graph[0][0].style.backgroundColor = "purple"
    for (let i=next_node; i<6; i++) {
        for (let j=0; j<6; j++) {
            if (graph_template[i][j] === 0)
                graph[i][j].style.backgroundColor = "gray"
            if (graph_template[i][j] === 1 && visited[i][j] === false && found === false) {
                visited[i][j] = true;
                dfs(j)
                graph[i][j].style.backgroundColor = "orange"
                // console.log("waiting for one minute");
                // await sleep(5000)
            } else if (graph_template[i][j] === 2 && found === false) {
                found = true
                // console.log("Hii");
                graph[i][j].style.backgroundColor = "green"
            }
        }
    }
}


reshape()
graph_template = [
    [0, 1, 1, 0, 0, 0],
    [1, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 1, 0],
    [0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 2],
    [0, 0, 0, 0, 1, 0],
]


graph_template = [
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 2, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
]

dfs(0)
console.log(graph);
console.log(visited);

for (let i=0; i<visited.length; i++)
    if (visited[i])
        console.log(i);
