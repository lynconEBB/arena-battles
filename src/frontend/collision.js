import {subtractVectors} from "./vectorUtils.js";

const getProjectionRangeCircle = (circleCenter,radius, projectionAxis) => {
    const projectionLength = circleCenter.getProjectionLengthOnto(projectionAxis);
    return {
        min: projectionLength - radius,
        max: projectionLength + radius
    }
}

const getProjectionRange = (vertices, projectionAxis) => {
    const range = {};
    range.max = range.min = vertices[0].getProjectionLengthOnto(projectionAxis);

    for (let i = 1; i < vertices.length; i++) {
        const projectionLength = vertices[i].getProjectionLengthOnto(projectionAxis);

        (projectionLength < range.min) && (range.min = projectionLength);
        (projectionLength > range.max) && (range.max = projectionLength);
    }

    return range;
}

const checkVerticesCollision =  (verticesObject1, verticesObject2) => {
    for (let i = 0; i < verticesObject1.length; i++) {

        const nextVertex = (i === verticesObject1.length - 1 )? 0 : i+1;
        const projectionAxis = subtractVectors(verticesObject1[i],verticesObject1[nextVertex]).getPerpendicularVector();

        const rangeObject1 = getProjectionRange(verticesObject2, projectionAxis);
        const rangeObject2 = getProjectionRange(verticesObject1, projectionAxis);

        if (rangeObject1.min - rangeObject2.max > 0 || rangeObject2.min - rangeObject1.max > 0) {
            return false;
        }
    }

    return true;
}

export const testHitPolygonPolygon = (verticesObject1, verticesObject2) => {
    return checkVerticesCollision(verticesObject2, verticesObject1) && checkVerticesCollision(verticesObject1, verticesObject2);
};

export const testHitPolygonCircle = (polygonVertices, circleCenter, circleRadius) => {

    let projectionAxisCircle = subtractVectors(circleCenter, polygonVertices[0]);
    let shortestDistance = projectionAxisCircle.getLength();

    for (let i = 1; i < polygonVertices.length; i++) {
        let vertexCenterVector = subtractVectors(circleCenter, polygonVertices);

        if (vertexCenterVector.getLength() < shortestDistance) {
            shortestDistance = vertexCenterVector.getLength();
            projectionAxisCircle = vertexCenterVector;
        }
    }

    // Projections in polygon Axis
    for (let i = 0; i < polygonVertices.length; i++) {

        const nextVertex = (i === polygonVertices.length - 1 )? 0 : i+1;
        const projectionAxis = subtractVectors(polygonVertices[i],polygonVertices[nextVertex]).getPerpendicularVector();

        const polygonRange = getProjectionRange(polygonVertices, projectionAxis);
        const circleRange = getProjectionRangeCircle(circleCenter,circleRadius, projectionAxis);

        if (polygonRange.min - circleRange.max > 0 || circleRange.min - polygonRange.max > 0) {
            return false;
        }
    }

    // Projection in Circle axis
    const polygonRange = getProjectionRange(polygonVertices, projectionAxisCircle);
    const circleRange = getProjectionRangeCircle(circleCenter,circleRadius, projectionAxisCircle);

    return !(polygonRange.min - circleRange.max > 0 || circleRange.min - polygonRange.max > 0);
}