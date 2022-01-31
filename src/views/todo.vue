<template>
    <div class="todo">
        <div class="container">
            <div class="header">
                <img src="https://todos-app-v2.vercel.app/img/note.75134fb0.svg" alt="">
                <div class="title">To-Do List</div>
            </div>
            <form @submit.prevent="addTask">
                <input type="text" placeholder="Ajoute une tâche..." v-model="this.newTask">
                <button type="submit" class="addTask">
                    <span>Ajouter</span>
                </button>
            </form>
            <div class="tasks">
                <div v-for="(task, index) in this.tasks" :key="index" class="task">
                    <span class="taskText">{{ task }}</span>
                    <div class="cross">
                        <svg 
                            @click="deleteTask(index)"
                            class="svg-inline--fa fa-times fa-w-11 close" 
                            aria-hidden="true" 
                            focusable="false" 
                            data-prefix="fas" 
                            data-icon="times" 
                            role="img" 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 352 512" 
                            data-v-132cabf7="">
                            <path 
                                class="" 
                                fill="currentColor" 
                                d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                                >
                            </path>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="footer">
                <span>{{ this.tasks.length }} tâche{{this.tasks.length > 1 ? "s" : "" }} restante{{this.tasks.length > 1 ? "s" : "" }}</span>
                <span class="deleteAll" @click="deleteAllTasks()">Supprimer</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tasks: ["tâche A", "tâche B", "tâche C"],
            newTask: ""
        }
    },
    methods: {
        addTask() {
            if ( this.newTask.length > 0) {
                this.tasks.push(this.newTask)
                this.newTask = ""
            }
        },
        deleteTask(index) {
            console.log(index)
            this.tasks.splice(index, 1);
        },
        deleteAllTasks() {
            this.tasks = []
        }
    }
}
</script>

<style lang="scss" scoped>

.todo {
    display: flex;
    min-height: 100vh;
    background-image: linear-gradient(90deg,#ffafbd,#ffc3a0);
    justify-content: center;
    align-items: center;
    font-family: Yanone Kaffeesatz,sans-serif;
    padding: 120px 0px;

    @media screen and (max-width: 1024px) {
        padding: 70px 0px;

    }

    .container {
        background-color: rgb(248, 248, 248);
        max-width: 450px;
        width: 80%;
        padding: 50px 0px;
        border-radius: 15px;
        box-shadow: rgba(100, 100, 111, 0.3) 0px 7px 29px 0px;
        display: flex;
        flex-direction: column;

        .header {
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                height: 80px;
                width: 80px;
                margin-right: 10px;
            }

            .title {
                transform: rotate(3deg);
                font-size: 21px;
                padding: 12px 15px 9px 15px;
                background: #fe7345;
                color: white;
                margin-left: 5px;
                border-radius: 5px;
            }

        }

        form {
            display: flex;
            justify-content: center;
            margin-top: 40px;

            input {
                border: none;
                border-bottom: 3px dashed #fe7345;
                background: transparent;
                margin-right: 30px;
                width: 50%;
                padding: 7px 3px 5px 0px;
                font-size: 18px;
                font-family: Yanone Kaffeesatz,sans-serif;

                &::placeholder {
                    color: #B5BDC4;
                }

                &:focus {
                    outline: none;
                }
            }

            .addTask {
                position: relative;
                transform: rotate(4deg);
                border-radius: 6px;
                transition: transform .25s cubic-bezier(.175,.885,.32,1.275);

                &:hover {
                    cursor: pointer;
                }

                &::before {
                    position: absolute;
                    left: 0;
                    top: 0;
                    content: "";
                    width: 100%;
                    height: 100%;
                    transform: scaleY(1.07);
                    border: 1px solid #494a4b;
                    border-radius: inherit;
                    transform-origin: top;
                    background-image: url(data:image/png;base64,R0lGODlhBAAEAIABAAAAAAAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjEgNjQuMTQwOTQ5LCAyMDEwLzEyLzA3LTEwOjU3OjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1LjEgV2luZG93cyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5NUY1OENCRDdDMDYxMUUyOTEzMEE1MEM5QzM0NDVBMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5NUY1OENCRTdDMDYxMUUyOTEzMEE1MEM5QzM0NDVBMyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjk1RjU4Q0JCN0MwNjExRTI5MTMwQTUwQzlDMzQ0NUEzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjk1RjU4Q0JDN0MwNjExRTI5MTMwQTUwQzlDMzQ0NUEzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAAAQAsAAAAAAQABAAAAgYEEpdoeQUAOw==);
                    background-color: #fe7345;
                    transition: transform .25s cubic-bezier(.175,.885,.32,1.275);
                }

                span {
                    position: relative;
                    display: block;
                    font-size: 15px;
                    padding: 0.34em 0.84em;
                    border: 1px solid #494a4b;
                    border-radius: inherit;
                    background-color: #fff;
                    transition: background-color 0.5s ease-out;

                    &:hover {
                        background-color: #e2e2e2;
                    }
                }
            }
        }

        .tasks {
            display: flex;
            flex-direction: column;
            margin: 50px 15% 0px 15%;


            .task {
                display: flex;
                width: 100%;
                margin: 12px 0px;

                input {
                    margin-right: 15px;
                    align-self: center;
                }

                .taskText {
                    text-align: justify;
                    overflow-wrap: anywhere;
                    margin-right: 10px;
                }

                .cross {
                    margin: 0 0 0 auto;
                    align-self: center;

                    svg {
                        height: 13px;
                        transition: color 0.2s ease-out;
    
                        &:hover {
                            cursor: pointer;
                            color: grey;
                        }
                    }
                }

            }
        }

        .footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 70px 15% 0px 15%;

            .deleteAll {
                padding: 7px 10px;
                background-color: #fe7345;
                color: white;
                border-radius: 5px;
                transition: background-color 0.35s ease-out;

                &:hover {
                    cursor: pointer;
                    background-color: #fd5219;
                }
            }
        }
    }
}

</style>