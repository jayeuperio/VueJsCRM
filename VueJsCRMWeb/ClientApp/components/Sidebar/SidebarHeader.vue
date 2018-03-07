<template>
    <div class="sidebar-header">
        <div>
            <strong>{{display}}</strong>
        </div>
        <div class="text-muted">
            <small>Founder &amp; CEO</small>
        </div>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue';
    import { Component } from 'vue-property-decorator';

    @Component
    export default class SidebarHeader extends Vue {
        name: 'sidebar-header';
        display: string = "Jay Euperio";
    }
</script>
