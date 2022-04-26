import $ from 'jquery'
import detectEthereumProvider from '@metamask/detect-provider'
import { addChainToMM } from '../lib/add_chain_to_mm'

$(document).click(function (event) {
  const clickover = $(event.target)
  const _opened = $('.navbar-collapse').hasClass('show')
  if (_opened === true && $('.navbar').find(clickover).length < 1) {
    $('.navbar-toggler').click()
  }
})

const search = (value) => {
  if (value) {
    window.location.href = `/search?q=${value}`
  }
}

$(document)
  .on('keyup', function (event) {
    if (event.key === '/') {
      $('.main-search-autocomplete').trigger('focus')
    }
  })
  .on('click', '.js-btn-add-chain-to-mm', event => {
    const $btn = $(event.target)
    addChainToMM({ btn: $btn })
  })

$('.main-search-autocomplete').on('keyup', function (event) {
  if (event.key === 'Enter') {
    let selected = false
    $('li[id^="autoComplete_result_"]').each(function () {
      if ($(this).attr('aria-selected')) {
        selected = true
      }
    })
    if (!selected) {
      search(event.target.value)
    }
  }
})

$('#search-icon').on('click', function (event) {
  const value = $('.main-search-autocomplete').val() || $('.main-search-autocomplete-mobile').val()
  search(value)
})

$('.main-search-autocomplete').on('focus', function (_event) {
  $('#slash-icon').hide()
  $('.search-control').addClass('focused-field')
})

$('.main-search-autocomplete').on('focusout', function (_event) {
  $('#slash-icon').show()
  $('.search-control').removeClass('focused-field')
})

const $addChainBtn = $('.btn-add-chain')

$addChainBtn.on('click', async function () {
  const provider = await detectEthereumProvider()

  if (provider) {
    try {
      const data_detail = $addChainBtn.prop('dataset')
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: `0x${(+data_detail.chainid).toString(16)}`,
          chainName: data_detail.chainname,
          nativeCurrency: {
            name: data_detail.coin,
            symbol: data_detail.coin,
            decimals: 18,
          },
          rpcUrls: [data_detail.rpcurl],
          blockExplorerUrls: [data_detail.explorerurl],
        }],
      })

    } catch (error) {
      console.log(error)
    }
  } else {
    console.log("No injected ethereum provider detected!")
  }
})