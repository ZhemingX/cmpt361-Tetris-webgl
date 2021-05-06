var colorMap = [
    [0.0, 0.0, 0.0, 1.0],
    [1.0, 0.0, 0.0, 1.0], //red
    [0.0, 1.0, 0.0, 1.0], //green
    [0.0, 0.0, 1.0, 1.0],
    [1.0, 1.0, 0,0, 1.0],
    [1.0, 0.0, 1,0, 1.0],
    [0.0, 1.0, 1,0, 1.0],
    [0.5, 0.5, 0.5, 1.0],
];

function Block_Type(cx, cy) {
    var block_t = [];
    
    var type_O = [
        [[cx, cy], [cx + 1, cy], [cx, cy + 1], [cx + 1, cy + 1]],
        [[cx, cy], [cx + 1, cy], [cx, cy + 1], [cx + 1, cy + 1]],
        [[cx, cy], [cx + 1, cy], [cx, cy + 1], [cx + 1, cy + 1]],
        [[cx, cy], [cx + 1, cy], [cx, cy + 1], [cx + 1, cy + 1]],
    ];
    block_t.push(type_O);

    var type_I = [
        [[cx, cy], [cx, cy - 1], [cx, cy - 2], [cx, cy + 1]],
        [[cx, cy], [cx - 1, cy], [cx + 1, cy], [cx + 2, cy]],
        [[cx, cy], [cx, cy - 1], [cx, cy + 1], [cx, cy + 2]],
        [[cx, cy], [cx + 1, cy], [cx - 1, cy], [cx - 2, cy]],
    ];
    block_t.push(type_I);

    var type_S = [
        [[cx, cy], [cx, cy + 1], [cx + 1, cy], [cx + 1, cy - 1]],
        [[cx, cy], [cx - 1, cy], [cx, cy + 1], [cx + 1, cy + 1]],
        [[cx, cy], [cx, cy - 1], [cx - 1, cy], [cx - 1, cy + 1]],
        [[cx, cy], [cx + 1, cy], [cx, cy - 1], [cx - 1, cy - 1]],
    ]
    block_t.push(type_S);

    var type_Z = [
        [[cx, cy], [cx, cy - 1], [cx + 1, cy], [cx + 1, cy + 1]],
        [[cx, cy], [cx + 1, cy], [cx, cy + 1], [cx - 1, cy + 1]],
        [[cx, cy], [cx, cy + 1], [cx - 1, cy], [cx - 1, cy - 1]],
        [[cx, cy], [cx - 1, cy], [cx, cy - 1], [cx + 1, cy - 1]],
    ]
    block_t.push(type_Z);

    var type_L = [
        [[cx, cy], [cx, cy + 1], [cx, cy - 1], [cx + 1, cy - 1]],
        [[cx, cy], [cx - 1, cy], [cx + 1, cy], [cx + 1, cy + 1]],
        [[cx, cy], [cx, cy - 1], [cx, cy + 1], [cx - 1, cy + 1]],
        [[cx, cy], [cx + 1, cy], [cx - 1, cy], [cx - 1, cy - 1]],
    ]
    block_t.push(type_L);

    var type_J = [
        [[cx, cy], [cx, cy - 1], [cx, cy + 1], [cx + 1, cy + 1]],
        [[cx, cy], [cx + 1, cy], [cx - 1, cy], [cx - 1, cy + 1]],
        [[cx, cy], [cx, cy + 1], [cx, cy - 1], [cx - 1, cy - 1]],
        [[cx, cy], [cx - 1, cy], [cx + 1, cy], [cx + 1, cy - 1]],
    ]
    block_t.push(type_J);

    var type_T = [
        [[cx, cy], [cx, cy + 1], [cx, cy - 1], [cx + 1, cy]],
        [[cx, cy], [cx - 1, cy], [cx + 1, cy], [cx, cy + 1]],
        [[cx, cy], [cx, cy + 1], [cx, cy - 1], [cx - 1, cy]],
        [[cx, cy], [cx + 1, cy], [cx - 1, cy], [cx, cy - 1]],
    ]
    block_t.push(type_T);
    

   return block_t;
}