export function Styled() {
  return (
    <style jsx>
      {`

.main{
  a {
    color: #2B4DFF !important;
    fill: #2B4DFF !important;

    &:hover {
      text-decoration-line: underline !important;
    }
  }
}
.content{
  ol > li {
    margin-left:1em;
    list-style-type: decimal;
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px; 
    margin-bottom: 16px; 
    margin-top: 52px;
  }
}
`}
    </style>
  )
}
