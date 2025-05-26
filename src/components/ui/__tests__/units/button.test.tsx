import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../../button'

test('renderiza o botão e responde ao clique', () => {
   const onClick = jest.fn()
   render(<Button onClick={onClick}>Clique</Button>)
   fireEvent.click(screen.getByText('Clique'))
   expect(onClick).toHaveBeenCalled()
})

test('aplica className customizado', () => {
   render(<Button className="custom-class">Teste</Button>)
   expect(screen.getByText('Teste')).toHaveClass('custom-class')
})
