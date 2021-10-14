<template>
<div id="content">
    <h1>Play with fashion</h1>
    <div class="game">
    <div class="controls">
        <h3>Gioca</h3>
    </div>
    <div class="background-workspace">
    </div>
    </div>
</div>
</template>

<style scoped>
#content{
    flex: 1 0 auto;
    padding: 12px 48px;
}

.game{
    display: flex;
    margin-bottom: 50px;
}

.controls{
    width: 40%;
}

.background-workspace{
    width: 50%;
    height: 900px;
    border: 3px solid black;
    background-color: #efe6dd;
    float: right;
}


</style>