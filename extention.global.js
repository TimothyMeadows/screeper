global.diff = function(left, right) {
    var index, leftDiff = [], rightDiff = [];
    for (index in left) {
        if (!right[index])
            leftDiff.push(index);
    }

    for (index in right) {
        if (!left[index]) 
            rightDiff.push(index);
    }

    return { left: leftDiff, right: rightDiff };
};

global.sync = function(left, right) {
    var index, leftDiff = [], rightDiff = [];
    var diff = global.diff(left, right);
    if (diff.left.length > 0) {
        for (index in diff.left) {
            delete left[index];
            leftDiff.push(index);
        }
    }

    if (diff.right.length > 0) {
        for (index in diff.left) {
            left[index] = right[index];
            rightDiff.push(index);
        }
    }

    return { left: leftDiff, right: rightDiff };
};