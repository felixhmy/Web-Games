var b2Vec2 = Box2D.Common.Math.b2Vec2
    ,   b2AABB = Box2D.Collision.b2AABB
    ,   b2BodyDef = Box2D.Dynamics.b2BodyDef
    ,   b2Body = Box2D.Dynamics.b2Body
    ,   b2FixtureDef = Box2D.Dynamics.b2FixtureDef
    ,   b2Fixture = Box2D.Dynamics.b2Fixture
    ,   b2World = Box2D.Dynamics.b2World
    ,   b2Shape = Box2D.Collision.Shapes.b2Shape
    ,   b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
    ,   b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
    ,   b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
    ,   b2EdgeShape = Box2D.Collision.Shapes.b2EdgeShape
    ,   b2DebugDraw = Box2D.Dynamics.b2DebugDraw
    ,   b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef
    ,   b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef
    ,   b2Joint = Box2D.Dynamics.Joints.b2Joint
    ,   b2PrismaticJointDef = Box2D.Dynamics.Joints.b2PrismaticJointDef
    ,   b2DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef
    ,   b2PulleyJointDef = Box2D.Dynamics.Joints.b2PulleyJointDef
    ,   b2GearJointDef = Box2D.Dynamics.Joints.b2GearJointDef
    ;

var gravity = null;
var world = null;
var doSleep = false;
var scale = 100;

function AsignDefaultValues(options)
{
    // default values
    let defaultOptions = {
        density : 1.0,
        friction: 1.0,
        restitution : 0.5,
        isSensor: false,
 
        linearDamping : 0.0,
        angularDamping: 0.0,
        fixedRotation : true,
 
        type : b2Body.b2_dynamicBody
    }
    return Object.assign(defaultOptions, options);
}

function CreateFixtureDefinition(options)
{
    // Fixture: defines physics properties (density, friction, restitution)
    const fixtDef = new b2FixtureDef();

    fixtDef.density = options.density;
    fixtDef.friction = options.friction;
    fixtDef.restitution = options.restitution;
    fixtDef.isSensor = options.isSensor;

    return fixtDef;
}

function CreateBodyDefinition(options, x, y)
{
    // Body: linear & angular damping, type, userData & other flags
    const bodyDef = new b2BodyDef();
    bodyDef.position.Set(x, y);

    bodyDef.linearDamping = options.linearDamping;
    bodyDef.angularDamping = options.angularDamping;
    bodyDef.fixedRotation = options.fixedRotation;
    bodyDef.type = options.type;

    bodyDef.userData = options.userData;

    return bodyDef;
}

function CreateBody(world, options, x, y)
{
    const bodyDef = CreateBodyDefinition(options, x, y);
    const body = world.CreateBody(bodyDef);

    return body;
}

function CreateBox(world, x, y, width, height, options)
{
    options = AsignDefaultValues(options);

    // fixture
    const fixtDef = CreateFixtureDefinition(options);

    // set the box shape
    fixtDef.shape = new b2PolygonShape();
    fixtDef.shape.SetAsBox(width / 2, height / 2);

    const body = CreateBody(world, options, x, y);
    body.CreateFixture(fixtDef);

    return body;
}

function CreateCircle(world, x, y, radius, options)
{
    options = AsignDefaultValues(options);

    // fixture
    const fixtDef = CreateFixtureDefinition(options);

    // set the box shape
    fixtDef.shape = new b2CircleShape(radius);

    const body = CreateBody(world, options, x, y);
    body.CreateFixture(fixtDef);

    return body;
}

function CreateEdge(world, x, y, p1x, p1y, p2x, p2y, options)
{
    // default values
    options = AsignDefaultValues(options);

    // Fixture: define physics properties (density, friction, restitution)
    const fixtDef = CreateFixtureDefinition(options);

    // Shape: 2d geometry
    fixtDef.shape = new b2PolygonShape();
    fixtDef.shape.SetAsEdge(new b2Vec2(p1x, p1y), new b2Vec2(p2x, p2y));

    // Body: position of the object and its type (dynamic, static o kinetic)
    let body = CreateBody(world, options, x, y);
    body.CreateFixture(fixtDef);

    return body;
}

// Create a Box2D world object
function CreateWorld(ctx)
{   
    gravity = new b2Vec2(0, 0);
    world = new b2World(gravity, doSleep);

    // DebugDraw is used to create the drawing with physics
    let debugDraw = new b2DebugDraw();
    debugDraw.SetSprite(ctx);
    debugDraw.SetDrawScale(scale);
    debugDraw.SetFillAlpha(0.25);
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);

    world.SetDebugDraw(debugDraw);

    return world;
}

function DrawWorldDebug(ctx)
{
    // Transform the canvas coordinates to cartesian coordinates
    ctx.save();
    ctx.translate(0, canvas.height);
    ctx.scale(1, -1);
    world.DrawDebugData();
    ctx.restore();
}

