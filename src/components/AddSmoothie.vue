<template>
    <div class="add-smoothie container">
        <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
        <form @submit.prevent="AddSmoothie">
            <div class="field title">
                <label for="title">Smoothie Title</label>
                <input type="text" name="title" v-model="title">
            </div>

            <!-- Displays the chips of previously added ingredients -->
            <!-- <ul class="ingredients">
                <li v-for="(ingredient, index) in ingredients" :key="index">
                    <span class="chip item-align">{{ ingredient }}
                        <i class="material-icons clear" @click="deleteIngredient(ingredient)">clear</i>
                    </span>
                </li>
            </ul> -->

            <!-- Shows the inputs of previously added ingredients -->
            <div v-for="(ingredient, index) in ingredients" :key="index" class="field">
                <label for="ingredient">Ingredient:</label>
                <input type="text" name="ingredient" v-model="ingredients[index]">
                <i class="material-icons delete" @click="deleteIngredient(ingredient)">delete</i>
            </div>


            <div class="field add-ingredient">
                <label for="add-ingredient">Add an ingredient</label>
                <input type="text" name="add-ingredient" @keydown.tab.prevent="addIngredient" v-model="another">
                <p v-if="feedback" class="red-text">{{ feedback }}</p>
            </div>
            <div class="field center-align">
                <button class="btn pink"> Add Smoothie</button>
            </div>
        </form>
    </div>
</template>

<script>

import db from '@/firebase/init'
import slugify from 'slugify'

export default {
    name: 'AddSmoothie',
    data() {
        return {
            title: null,
            another: null,
            ingredients: [],
            feedback: null,
            slug: null
        }
    },
    methods: {
        AddSmoothie() {
            // console.log(this.title)
            if(this.title) {
                this.feedback = null
                this.slug = slugify(this.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                }),
                // console.log(this.slug)
                db.collection('smoothies').add({
                    title: this.title,
                    ingredients: this.ingredients,
                    slug: this.slug
                }).then(() => {
                    this.$router.push({ name: 'Index'})
                }).catch(err => {
                    console.log(err)
                })

            } else {
                this.feedback = 'You must enter a title'
            }
            
        },
        addIngredient() {
            if (this.another) {
                this.ingredients.push(this.another)
                console.log(this.ingredients)
                this.another = null
                this.feedback = null
            } else {
                this.feedback = 'Please enter an ingredient to be added'
            }
        },
        deleteIngredient(ing) {
            // console.log("Clear Ingredient", ingredient)
            this.ingredients = this.ingredients.filter( ingredient => {
                return ingredient !== ing
            })
        }
    }
}
</script>

<style>
    .add-smoothie {
        padding: 20px;
        max-width: 500px;
        margin-top: 60px;
    }

    .add-smoothie h2 {
        margin: 20px auto;
        font-size: 2em;
    }

    .add-smoothie .field {
        margin: 20px auto;
        position: relative;
    }

    .ingredients li {
        display: inline-block;
    }

    .ingredients .clear {
        cursor: pointer;
        font-size: 1em;
        margin-left: 5px;
    }

    .ingredients .item-align {
        display: flex; 
        align-items: center;        
        flex-direction: row; 
    }

    .add-smoothie .delete {
        position: absolute;
        right: 0;
        bottom: 16px;
        color: #aaa;
        cursor: pointer;
        font-size: 1.4em;
    }

</style>
