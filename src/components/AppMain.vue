<template>
<div id="content">
    <router-view :key="$route.path"></router-view> <!--bind the routes path to the router-view's key, this way at each route change the component (data, etc) is updated -->
</div>
</template>
