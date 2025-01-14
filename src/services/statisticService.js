import api from "@/plugins/axios";

export function getYearStatistic(userId, year) {
    try{
        return api.get(`statistic/year?userId=${userId}&year=${year}`)
    } catch (error) {
        console.error(error)   
    }
}

export function saveStatistic(data) {
    try{
        return api.post(`statistic`, data)
    } catch (error) {
        console.error(error)   
    }
}

export function getAvailableYears(){
    try{
        return api.get(`statistic/available-years`)
    } catch (error) {
        console.error(error)   
    }
}

export function getLastActivity(){
    try{
        return api.get(`statistic/last-activity`)
    } catch (error) {
        console.error(error)   
    }
}

export function getStatisticById(id){
    try{
        return api.get(`statistic/?id=${id}`)
    } catch (error) {
        console.error(error)   
    }
}