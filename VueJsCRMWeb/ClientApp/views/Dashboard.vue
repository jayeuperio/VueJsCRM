<template>
    <div class="animated fadeIn">
        <p class="text-info">Hello World</p>
        <button class="btn-primary" @click="checkAuthorize()">Check Auth</button>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue';
    import { Component } from 'vue-property-decorator'
    import { authService } from '../services/authservice';

    @Component
    export default class DashBoard extends Vue {
        name: 'dashboard';

        checkAuthorize() {

            authService.test().then(response => {

                if (!response.is_error) {
                }

            });

        }
    }
</script>
