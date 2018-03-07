<template>
    <div class="sidebar-header">
        <div>
            <strong>{{userData.firstName}} {{userData.lastName}}</strong>
        </div>
        <div class="text-muted">
            <small>{{userData.position}}</small>
        </div>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue';
    import { IUserViewModel } from '../../models/users';
    import { Component } from 'vue-property-decorator';
    import { commonService } from '../../services/commonservice';

    @Component
    export default class SidebarHeader extends Vue {
        name: 'sidebar-header';
        userData: IUserViewModel = { userName: 'unknown', firstName: 'unknown', lastName: 'unknown', middleName: 'unknown', address: 'unknown', gender: 0, authenticated: false, roles: [] };
        display: string = "Jay Euperio";

        mounted() {
            this.userData = this.$store.state.currentUser;
        }
    }
</script>
