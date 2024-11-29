const PI2 = Math.PI * 2;
const PIH = Math.PI / 2;
const degToRad = Math.PI / 180;
const radToDeg = 180 / Math.PI;

function RandomBetween(min, max)
{
    return (Math.random() * (max - min)) + min;
}

function GetRandomColor() {
    var r = 255 * Math.random() | 0,
        g = 255 * Math.random() | 0,
        b = 255 * Math.random() | 0;
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function SqrDistance(p1, p2)
{
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;

    return (dx * dx) + (dy * dy);
}

function PointInsideCircle(pointPosition, circlePosition, circleRadius)
{
    const difX = pointPosition.x - circlePosition.x;
    const difY = pointPosition.y - circlePosition.y;

    const dist = Math.sqrt(difX * difX + difY * difY);

    return dist < circleRadius;
}

function PointInsideCircle2(pointPosition, circlePosition, circleSqrRadius)
{
    return SqrDistance(pointPosition, circlePosition) < circleSqrRadius;
}

function PointInsideRectangle(point, rectangle)
{
    return point.x >= (rectangle.position.x) &&
           point.x <= (rectangle.position.x + rectangle.width) &&
           point.y >= (rectangle.position.y) &&
           point.y <= (rectangle.position.y + rectangle.height);
}

function CheckCollisionPolygon(point, polygon)
{
    // polygon es un array de puntos
    let count = polygon.length;
    for (var i = 0; i < polygon.length; i++)
    {
        let d = PointToSegmentSign(polygon[i], polygon[(i + 1) % polygon.length], point);
        if (d < 0)
            count--;
    }
    return (count == 0);
}
 
function DistancePointToSegment (A, B, p)
{
    // A y B son los puntos de la recta
    return (((B.x - A.x)*(A.y - p.y) - (A.x - p.x)*(B.y - A.y)) /
            (Math.sqrt((B.x - A.x)*(B.x - A.x) + (B.y - A.y)*(B.y - A.y))));
}

function PointToSegmentSign(A, B, p)
{
    return ((B.x - A.x)*(A.y - p.y) - (A.x - p.x)*(B.y - A.y));
}

function RotatePointAroundPoint(origCoord, pointCoord, angle)
{
    var x = pointCoord.x,
        y = pointCoord.y,
        cx = origCoord.x,
        cy = origCoord.y;
    var rad = angle;//(Math.PI / 180) * angle;
    var cos = Math.cos(rad);
    var sin = Math.sin(rad);
    return {
        x: (cos * (x - cx)) + (sin * (y - cy)) + cx,
        y: (cos * (y - cy)) - (sin * (x - cx)) + cy
    };
}

function NormalizeVector(vector)
{
    let x2 = vector.x * vector.x;
    let y2 = vector.y * vector.y;
    let length = Math.sqrt(x2 + y2);

    vector.x = vector.x / length;
    vector.y = vector.y / length;
}

function DotProduct(vec1, vec2)
{
    return vec1.x * vec2.x + vec1.y * vec2.y;
}

function IntersectionBetweenLines(l1p1, l1p2, l2p1, l2p2)
{
    let result = {
        det: 0,
        x: -1,
        y: -1,
        t: -1,
        u: -1
    }

    // simp
    /*const A1 = l1p2.y - l1p1.y;
    const B1 = l1p1.x - l1p2.x;
    const C1 = A1 * l1p1.x + B1 * l1p1.y;

    const A2 = l2p2.y - l2p1.y;
    const B2 = l2p1.x - l2p2.x;
    const C2 = A2 * l2p1.x + B2 * l2p1.y;

    result.det = A1 * B2 - A2 * B1;
    if (result.det !== 0) {
        result.x = (B2 * C1 - B1 * C2) / result.det;
        result.y = (A1 * C2 - A2 * C1) / result.det;
    }*/

    // http://jsfiddle.net/justin_c_rounds/Gd2S2/light/
    const den = (l1p1.x - l1p2.x) * (l2p1.y - l2p2.y) - (l1p1.y - l1p2.y) * (l2p1.x - l2p2.x);
    if (den != 0)
    {
        const t = ((l1p1.x - l2p1.x) * (l2p1.y - l2p2.y) - (l1p1.y - l2p1.y) * (l2p1.x - l2p2.x)) / den;
        const u = -((l1p1.x - l1p2.x) * (l1p1.y - l2p1.y) - (l1p1.y - l1p2.y) * (l1p1.x - l2p1.x)) / den;

        if (t > 0 && t < 1 && u > 0 && u < 1)
        {
            result.x = l1p1.x + t * (l1p2.x - l1p1.x);
            result.y = l1p1.y + t * (l1p2.y - l1p1.y);
            result.det = den;
            result.t = t;
            result.u = u;
        }
    }
    return result;
}

class Vector2
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    static Zero()
    {
        return new Vector2(0, 0);
    }

    Set(x, y)
    {
        this.x = x;
        this.y = y;
    }

    Length()
    {
        const x2 = this.x * this.x;
        const y2 = this.y * this.y;
        return Math.sqrt(x2 + y2);
    }

    Normalize()
    {
        const length = this.Length();

        if (length > 0)
        {
            this.x = this.x / length;
            this.y = this.y / length;
        }
    }

    Add(otherVector)
    {
        this.x += otherVector.x;
        this.y += otherVector.y;
    }

    Sub(otherVector)
    {
        this.x -= otherVector.x;
        this.y -= otherVector.y;
    }

    DotProduct(otherVector)
    {
        return this.x * otherVector.x + this.y * otherVector.y;
    }

    MultiplyScalar(scalar)
    {
        this.x *= scalar;
        this.y *= scalar;
    }

    AngleBetween(otherVector)
    {
        // vec1 and vec2 should be normalized

        // a · b = |a| × |b| × cos(θ)
        // cos(θ) = (a · b) / |a| × |b|
        // θ = arccos[(a · b) / |a| × |b|]
        // si a y b son unitarios: θ = arccos(a · b)
        const dotProduct = this.DotProduct(otherVector);
        return Math.acos(dotProduct);
    }

    Random()
    {
        this.x = (Math.random() * 2) - 1;
        this.y = (Math.random() * 2) - 1;
    }

    RandomNormalized()
    {
        this.Random();
        this.Normalize();
    }
}
