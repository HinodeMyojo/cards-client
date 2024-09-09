<template>
    <input :value="modelValue" @input="updateInput" class="input" type="text" >
</template>

<script>
export default {
    name: 'my-input',
    props:{
        modelValue:[String, Number]
    },
    methods:{
        updateInput(event){
            this.$emit('update:modelValue', event.target.value)
        }
    }
}

</script>

<style scoped>
.post{
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>