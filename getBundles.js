const { nodes, edges } = require("./plansDiagram.json");

// Services that cannot be repeated
const isServiceRepeated = (name1, name2) => !(name1.indexOf("TV") > -1 && name2.indexOf("TV") > -1) && !(name1.indexOf("Broadband") > -1 && name2.indexOf("Broadband") > -1) && !(name1.indexOf("Landline") > -1 && name2.indexOf("Landline") > -1);

// Transform object of combinations in array
const bundlesToArray = (objectBundles) => {
    var arrBundle = [];

    Object.keys(objectBundles).forEach((k) => {
        objectBundles[k].forEach((bundle) => {
            arrBundle = [...arrBundle, bundle];
        });
    });

    return arrBundle;
}

// Get all neighbors (and self) combinations of a node
const nearCombinations = () => {
    var nearEdges = {};

    Object.keys(nodes).forEach((key) => {
        var { standAlone, name, value } = nodes[key];

        if(standAlone) {
            nearEdges[key] = [];

            nearEdges[key].push({ plan: name, price: value });

            // Filter edges of node
            var auxEdges = edges.filter(({ start }) => start == key);
            var numEdges = auxEdges.length;
            
            for(var i = 0; i < numEdges; i++) {
                let { end, val } = auxEdges[i];
                var actualName = baseName = `${name} + ${nodes[end].name}`;
                var ammount = baseMount = value + val + nodes[end].value;

                nearEdges[key].push({ plan: actualName, price: ammount });

                for(var j = i + 1; j < numEdges; j++) {
                    let { end, val } = auxEdges[j];   
                    let nameEnd = nodes[end].name;

                    if(isServiceRepeated(baseName, nameEnd)) {
                        nearEdges[key].push({ plan: `${baseName} + ${nameEnd}`, price: baseMount + nodes[end].value + val });

                        if(isServiceRepeated(nameEnd, actualName) && (j > (i + 1))) {
                            actualName += ` + ${nameEnd}`;
                            ammount += nodes[end].value + val;

                            nearEdges[key].push({ plan: actualName, price: ammount });
                        }
                    }
                }
            }
        } 
    });

    return nearEdges;
};

// Get all combinations 
const getPossibilities = (node) => {
    var allPossibilities = nearCombinations();

    var allKeys = Object.keys(allPossibilities);
    allKeys.forEach((key, i, arr) => {

        var edgeFound = edges.filter(({ start, end }) => start == key && allKeys.indexOf(end) > -1)

        edgeFound.forEach(({ end, val }) => {
            allPossibilities[key].forEach((nodeM) => {
                allPossibilities[end].forEach((nodeS) => {

                    if(isServiceRepeated(nodeM.plan, nodeS.plan))
                        allPossibilities[key].push({ plan: `${nodeM.plan} + ${nodeS.plan}`, price: nodeM.price + nodeS.price + val });
                });
            });        
        });
    });

    return bundlesToArray(allPossibilities);
};

const nodePlans = () => {
    var bundlesPossibles = allPossibilities();

    // Sort possibilities by price
    bundlesPossibles = bundlesPossibles.sort((a, b) => a.price - b.price );

    return bundlesPossibles;
}

module.exports = nodePlans;