import axios from 'axios';

export default axios.create({
    baseURL: 'https://aerolab-challenge.now.sh',
    headers: {
        'Content-Type':'application/json',
        'Accept':'application/json',
        'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzU0M2U1Njc0MjNlYzAwNmUyODIxOWQiLCJpYXQiOjE1NDkwMjQ4NTR9.GyIhCDIGpgQoU0-HQLqS4XXMfVUnpJGJwexLxZuuRKE'
        }
});