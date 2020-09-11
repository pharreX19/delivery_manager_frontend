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
    },
    {
        path: '/delivery', 
        component: Delivery
    },
    {
        path: '/report', 
        component: Report
    },
    {
        path: '/jobs', 
        component: Jobs
    },
    {
        path: '/admin-panel', 
        component: AdminPanel
    },
    {
        path: '/job-details/:jobId', 
        component: JobDetails,
        name: 'job-details'
    },
    {   
        path: '/admin/manage-staff', 
        component: Staff
    },
    {   
        path: '/admin/manage-items', 
        component: Items
    },
    {   
        path: '/admin/profile', 
        component: Profile
    },
    {   
        path: '/login', 
        component: Login
    },


];