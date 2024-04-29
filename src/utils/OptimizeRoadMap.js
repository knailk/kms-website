export const optimizeRoadMap = async (arrNodes) => {
    let allGraph = [];
    let allDirection = [];

    for (let nodeOrigin of arrNodes) {
        let currRoutes = [];
        let currGraph = [];
        let currDirection = []
        for (let nodeDestination of arrNodes) {
            if (nodeOrigin.id === nodeDestination.id) {
                currRoutes.push({ destination: nodeDestination.id, estimate: 0 })
                currGraph.push(0)
                currDirection.push(null)

            } else {
                let direction = await getDirection(nodeOrigin, nodeDestination);
                currDirection.push(direction)
                currRoutes.push({ destination: nodeDestination.id, estimate: direction.routes[0].legs[0].duration.value })
                currGraph.push(direction.routes[0].legs[0].duration.value)
            }
        }
        allGraph.push(currGraph)
        allDirection.push(currDirection)
    }
    
    let minPath = travelingSalesman(allGraph)
    let directions = generatePathBaseMinPath(minPath, allDirection)

    //append lat lgn base on minpath
    let makers = []
    for (let i = 0; i < minPath.length; i++) {
        makers.push(arrNodes[minPath[i]])
    }
    return { makers, directions };
}

const getDirection = async (origin, destination) => {
    return new Promise(resolve => {
        const DirectionsService = new window.google.maps.DirectionsService();
        DirectionsService.route(
            {
                origin: new window.google.maps.LatLng(origin.lat, origin.lng),
                destination: new window.google.maps.LatLng(destination.lat, destination.lng),
                travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    // let distance = result.routes[0].legs[0].distance.value;
                    resolve(result)
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            },
        );
    })
}

var minDistance = Number.MAX_SAFE_INTEGER;
var minPath = [];
const travelingSalesman = (allRoutes) => {
    minDistance = Number.MAX_SAFE_INTEGER;
    minPath = [];
    let path = [];
    let visited = new Array(allRoutes.length).fill(false);
    visited[0] = true;
    path.push(0);
    tsp(0, allRoutes, path, visited, 0, minPath);
    return minPath
}

const tsp = (pos, allRoutes, path, visited, distance) => {
    if (path.length === allRoutes.length) {
        distance += allRoutes[path[path.length - 1]][0];
        if (distance < minDistance) {
            minDistance = distance;
            minPath = [...path];
        }
        return;
    }
    for (let i = 0; i < allRoutes.length; i++) {
        if (!visited[i]) {
            visited[i] = true;
            path.push(i);
            tsp(i, allRoutes, path, visited, distance + allRoutes[pos][i]);
            visited[i] = false;
            path.pop();
        }
    }
}

const generatePathBaseMinPath = (minPath, allDirection) => {
    let path = [];
    for (let i = 0; i < minPath.length - 1; i++) {
        path.push(allDirection[minPath[i]][minPath[i + 1]])
    }
    return path;
}