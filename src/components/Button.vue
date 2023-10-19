<template>
    <button :class="btnClass" @click="handleClick">
        <slot></slot>
    </button>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
    primary: Boolean,
    secondary: Boolean,
    danger: Boolean,
    disabled: Boolean,
    outlineDanger: Boolean,
    size: String,
});

const btnClass = ref({
    'btn': true,
    'btn-primary': props.primary,
    'btn-secondary': props.secondary,
    'btn-danger': props.danger,
    'btn-outline-danger': props.outlineDanger,
    'btn-disabled': props.disabled,
    'btn-sm': props.size === 'sm',
    'btn-lg': props.size === 'lg',
});

const handleClick = () => {
    if (!props.disabled) {
        props.onClick && props.onClick();
    }
};
</script>
