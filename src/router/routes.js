import Dashboard from '../components/Dashboard.vue'
import Delivery from '../components/Delivery.vue'
import Report from '../components/Report.vue'
import Login from '../components/Login.vue'
import Jobs from '../components/Jobs.vue'
import JobDetails from '../components/JobDetails.vue'
import AdminPanel from '../components/AdminPanel.vue'
import Staff from '../components/Staff.vue'
import Items from '../components/Items.vue'
import Profile from '../components/Profile.vue'

export default [
    {   
        path: '/', 
        component: Dashboard,
        name: 'dashboard',
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/delivery', 
        component: Delivery,
        name: 'delivery',
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/report', 
        component: Report,
        name: 'report',
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/jobs', 
        component: Jobs,
        name: 'jobs',
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/admin-panel', 
        component: AdminPanel,
        name: 'admin-panel',
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/job-details/:jobId', 
        component: JobDetails,
        name: 'job-details',
        meta: {
            requiresAuth: true
        }
    },
    {   
        path: '/admin/manage-staff', 
        component: Staff,
        name: 'manage-staff',
        meta: {
            requiresAuth: true
        }
    },
    {   
        path: '/admin/manage-items', 
        component: Items,
        name: 'manage-items',
        meta: {
            requiresAuth: true
        }
    },
    {   
        path: '/admin/profile', 
        component: Profile,
        name: 'profile',
        meta: {
            requiresAuth: true
        }
    },
    {   
        path: '/logout', 
        name: 'logout',
        meta: {
            requiresAuth: true
        }
    },
    {   
        path: '/login', 
        component: Login,
        name: 'login',
        meta: {
            guest: true
        }
    },


];