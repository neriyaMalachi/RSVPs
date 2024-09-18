import { it, expect, describe } from 'vitest'
import {render, screen}from '@testing-library/react'
import Futer from '@/pages/componentForAdmin/Futer'
describe('Futer', () => {
    it('Should render the futer of aplication: ', () => {
        render(<Futer/>)
        screen.debug()
    })
    
})