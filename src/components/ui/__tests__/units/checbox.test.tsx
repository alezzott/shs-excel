import { render, screen, fireEvent } from '@testing-library/react'
import { Checkbox } from '../../checkbox'

test('renderiza o checkbox e responde ao clique', () => {
   const onCheckedChange = jest.fn()
   render(<Checkbox onCheckedChange={onCheckedChange} />)
   const checkbox = screen.getByRole('checkbox')
   fireEvent.click(checkbox)
   expect(onCheckedChange).toHaveBeenCalled()
})

test('aplica className customizado', () => {
   render(<Checkbox className="custom-class" />)
   expect(screen.getByRole('checkbox')).toHaveClass('custom-class')
})
